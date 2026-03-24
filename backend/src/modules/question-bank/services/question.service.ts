import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common'
import { QuestionRepository } from '../repositories/question.repository'
import { CreateQuestionDto } from '../dto/create-question.dto'
import { AddContentDto } from '../dto/add-content.dto'
import { PrismaService } from '../../../database/prisma.service'
import { AddOptionDto } from '../dto/add-option.dto'
import { AddConceptDto } from '../dto/add-concept.dto'
import { AddTagDto } from '../dto/add-tag.dto'
import { PublishQuestionDto } from '../dto/publish-question.dto'
import { GetQuestionsDto } from '../dto/get-questions.dto'

@Injectable()
export class QuestionService {
  constructor(
    private repo: QuestionRepository,
    private prisma: PrismaService
  ) {}

  async createQuestion(dto: CreateQuestionDto, user: any) {
    const { questionType, difficultyLevel } = dto

    const question = await this.repo.createQuestion({
      tenant_id: user.tenantId,
      created_by: user.userId
    })

    const version = await this.repo.createVersion({
      question_id: question.id,
      version_number: 1,
      question_type: questionType,
      status: 'draft',
      difficulty_level: difficultyLevel,
      created_by: user.userId
    })

    await this.repo.updateQuestion(question.id, {
      current_version_id: version.id
    })

    return {
      questionId: question.id,
      versionId: version.id
    }
  }

  async addContent(questionId: string, dto: AddContentDto, user: any) {
    const { stemText, explanation, passageId } = dto

    // ✅ Step 1 — Fetch question
    const question = await this.repo.getQuestionWithCurrentVersion(questionId)

    if (!question) {
      throw new NotFoundException('Question not found')
    }

    if (!question.current_version_id) {
      throw new BadRequestException('No current version found')
    }

    const currentVersion = await this.repo.getVersion(question.current_version_id)

    if (!currentVersion) {
      throw new NotFoundException('Current version not found')
    }

    console.log('Current version:', currentVersion)

    // ✅ Step 2 — Validate passage BEFORE DB write
    if (passageId) {
      const passage = await this.prisma.passage.findUnique({
        where: { id: passageId }
      })

      if (!passage) {
        throw new BadRequestException('Invalid passageId')
      }

      if (passage.tenant_id !== user.tenantId) {
        throw new ForbiddenException('Cross-tenant passage not allowed')
      }
    }

    // ✅ Step 3 — Calculate new version number
    const newVersionNumber =
      question.versions.length === 0
        ? 1
        : Math.max(...question.versions.map(v => v.version_number)) + 1

    // ✅ Step 4 — TRANSACTION (critical)
    try {
  const result = await this.prisma.$transaction(async (tx) => {

    const newVersion = await tx.questionVersion.create({
      data: {
        question_id: question.id,
        version_number: newVersionNumber,
        question_type: currentVersion.question_type,
        status: 'draft',
        difficulty_level: currentVersion.difficulty_level,
        created_by: user.userId
      }
    })

    console.log('New version created:', newVersion)

    await tx.questionContent.create({
      data: {
        version_id: newVersion.id,
        stem_text: stemText,
        explanation,
        passage_id: passageId || undefined
      }
    })

    console.log('Content created')

    await tx.question.update({
      where: { id: question.id },
      data: {
        current_version_id: newVersion.id
      }
    })

    console.log('Question updated')

    return newVersion
  })

  return {
    message: 'Content added as new version',
    versionId: result.id
  }

} catch (error) {
  console.error('TRANSACTION ERROR:', error)
  throw error
}
  }

  async addOptions(questionId: string, dto: AddOptionDto, user: any) {
  const { options } = dto

  // Step 1 — Get question + current version
  const question = await this.repo.getQuestionWithCurrentVersion(questionId)

  if (!question) throw new NotFoundException('Question not found')
  if (!question.current_version_id) throw new BadRequestException('No current version')

  const currentVersion = await this.repo.getVersion(question.current_version_id)

  if (!currentVersion) {
  throw new NotFoundException('Current version not found')
}

  // Step 2 — Validate options
  if (!options || options.length < 2) {
    throw new BadRequestException('At least 2 options required')
  }

  const correctCount = options.filter(o => o.isCorrect).length

  if (correctCount === 0) {
    throw new BadRequestException('At least one correct option required')
  }

  // Step 3 — New version number
  const newVersionNumber =
    Math.max(...question.versions.map(v => v.version_number)) + 1

  // Step 4 — TRANSACTION
  const result = await this.prisma.$transaction(async (tx) => {

    // 4.1 Create new version
    const newVersion = await tx.questionVersion.create({
      data: {
        question_id: question.id,
        version_number: newVersionNumber,
        question_type: currentVersion.question_type,
        status: 'draft',
        difficulty_level: currentVersion.difficulty_level,
        created_by: user.userId
      }
    })

    // 4.2 🔥 COPY EXISTING CONTENT
    if (currentVersion.content) {
      await tx.questionContent.create({
        data: {
          version_id: newVersion.id,
          stem_text: currentVersion.content.stem_text,
          explanation: currentVersion.content.explanation,
          passage_id: currentVersion.content.passage_id
        }
      })
    }

    // 4.3 ADD OPTIONS
    await tx.questionOption.createMany({
      data: options.map((opt, index) => ({
        version_id: newVersion.id,
        option_text: opt.optionText,
        is_correct: opt.isCorrect,
        option_order: index + 1
      }))
    })

    // 4.4 Update current version
    await tx.question.update({
      where: { id: question.id },
      data: {
        current_version_id: newVersion.id
      }
    })

    return newVersion
  })

  return {
    message: 'Options added as new version',
    versionId: result.id
  }
}

async addConcepts(questionId: string, dto: AddConceptDto, user: any) {
  const { conceptIds } = dto

  const question = await this.repo.getQuestionWithCurrentVersion(questionId)

  if (!question) throw new NotFoundException('Question not found')
  if (!question.current_version_id) throw new BadRequestException('No current version')

  const currentVersion = await this.repo.getVersion(question.current_version_id)

  if (!currentVersion) throw new NotFoundException('Current version not found')

  // ✅ Validate concepts (tenant safety)
  const concepts = await this.prisma.concept.findMany({
    where: {
      id: { in: conceptIds }
    }
  })

  if (concepts.length !== conceptIds.length) {
    throw new BadRequestException('Some conceptIds are invalid')
  }

  for (const concept of concepts) {
    if (concept.tenant_id !== user.tenantId) {
      throw new ForbiddenException('Cross-tenant concept not allowed')
    }
  }

  const newVersionNumber =
    Math.max(...question.versions.map(v => v.version_number)) + 1

  const result = await this.prisma.$transaction(async (tx) => {

    // 1. Create new version
    const newVersion = await tx.questionVersion.create({
      data: {
        question_id: question.id,
        version_number: newVersionNumber,
        question_type: currentVersion.question_type,
        status: 'draft',
        difficulty_level: currentVersion.difficulty_level,
        created_by: user.userId
      }
    })

    // 2. Copy content
    if (currentVersion.content) {
      await tx.questionContent.create({
        data: {
          version_id: newVersion.id,
          stem_text: currentVersion.content.stem_text,
          explanation: currentVersion.content.explanation,
          passage_id: currentVersion.content.passage_id
        }
      })
    }

    // 3. Copy options
    if (currentVersion.options.length > 0) {
      await tx.questionOption.createMany({
        data: currentVersion.options.map(opt => ({
          version_id: newVersion.id,
          option_text: opt.option_text,
          is_correct: opt.is_correct,
          option_order: opt.option_order
        }))
      })
    }

    // 4. 🔥 ADD CONCEPT MAPPINGS
    await tx.questionConcept.createMany({
      data: conceptIds.map(conceptId => ({
        question_id: question.id,
        concept_id: conceptId
      })),
      skipDuplicates: true
    })

    // 5. Update current version
    await tx.question.update({
      where: { id: question.id },
      data: {
        current_version_id: newVersion.id
      }
    })

    return newVersion
  })

  return {
    message: 'Concepts added as new version',
    versionId: result.id
  }
}

async addTags(questionId: string, dto: AddTagDto, user: any) {
  const { tagIds } = dto

  const question = await this.repo.getQuestionWithCurrentVersion(questionId)

  if (!question) throw new NotFoundException('Question not found')
  if (!question.current_version_id) throw new BadRequestException('No current version')

  const currentVersion = await this.repo.getVersion(question.current_version_id)

  if (!currentVersion) throw new NotFoundException('Current version not found')

  // ✅ Validate tags
  const tags = await this.prisma.tag.findMany({
    where: {
      id: { in: tagIds }
    },
    include: {
      category: true
    }
  })

  if (tags.length !== tagIds.length) {
    throw new BadRequestException('Some tagIds are invalid')
  }

  for (const tag of tags) {
    // tenant-safe (global tags allowed if tenant_id is null)
    if (tag.category.tenant_id && tag.category.tenant_id !== user.tenantId) {
      throw new ForbiddenException('Cross-tenant tag not allowed')
    }
  }

  const newVersionNumber =
    Math.max(...question.versions.map(v => v.version_number)) + 1

  const result = await this.prisma.$transaction(async (tx) => {

    // 1. Create version
    const newVersion = await tx.questionVersion.create({
      data: {
        question_id: question.id,
        version_number: newVersionNumber,
        question_type: currentVersion.question_type,
        status: 'draft',
        difficulty_level: currentVersion.difficulty_level,
        created_by: user.userId
      }
    })

    // 2. Copy content
    if (currentVersion.content) {
      await tx.questionContent.create({
        data: {
          version_id: newVersion.id,
          stem_text: currentVersion.content.stem_text,
          explanation: currentVersion.content.explanation,
          passage_id: currentVersion.content.passage_id
        }
      })
    }

    // 3. Copy options
    if (currentVersion.options.length > 0) {
      await tx.questionOption.createMany({
        data: currentVersion.options.map(opt => ({
          version_id: newVersion.id,
          option_text: opt.option_text,
          is_correct: opt.is_correct,
          option_order: opt.option_order
        }))
      })
    }

    // 4. 🔥 ADD TAGS
    await tx.questionTag.createMany({
      data: tagIds.map(tagId => ({
        question_id: question.id,
        tag_id: tagId
      })),
      skipDuplicates: true
    })

    // 5. Update current version
    await tx.question.update({
      where: { id: question.id },
      data: {
        current_version_id: newVersion.id
      }
    })

    return newVersion
  })

  return {
    message: 'Tags added as new version',
    versionId: result.id
  }
}

async publishQuestion(questionId: string, dto: PublishQuestionDto, user: any) {

  const question = await this.repo.getQuestionWithCurrentVersion(questionId)

  if (!question) throw new NotFoundException('Question not found')
  if (!question.current_version_id) throw new BadRequestException('No current version')

  const currentVersion = await this.repo.getVersion(question.current_version_id)

  if (!currentVersion) throw new NotFoundException('Current version not found')

  // 🔥 VALIDATION

  if (!currentVersion.content) {
    throw new BadRequestException('Question content missing')
  }

  if (currentVersion.question_type === 'MCQ') {
    if (currentVersion.options.length < 2) {
      throw new BadRequestException('At least 2 options required')
    }

    const correctCount = currentVersion.options.filter(o => o.is_correct).length

    if (correctCount === 0) {
      throw new BadRequestException('At least one correct option required')
    }
  }

  const conceptCount = await this.prisma.questionConcept.count({
    where: { question_id: question.id }
  })

  if (conceptCount === 0) {
    throw new BadRequestException('At least one concept required')
  }

  // 🔥 UPDATE STATUS (no new version)
  const updated = await this.prisma.questionVersion.update({
    where: { id: currentVersion.id },
    data: {
      status: 'published',
      difficulty_level: dto.difficultyLevel || currentVersion.difficulty_level
    }
  })

  return {
    message: 'Question published successfully',
    versionId: updated.id
  }
}

async getQuestions(query: GetQuestionsDto, user: any) {
  const {
    status,
    difficulty,
    conceptId,
    tagId,
    search,
    page,
    limit
  } = query

  const skip = (page - 1) * limit

  const where: any = {
    tenant_id: user.tenantId
  }

  // Filter by current version
  if (status || difficulty) {
    where.current_version = {
      ...(status && { status }),
      ...(difficulty && { difficulty_level: difficulty })
    }
  }

  // Concept filter
  if (conceptId) {
    where.concepts = {
      some: {
        concept_id: conceptId
      }
    }
  }

  // Tag filter
  if (tagId) {
    where.tags = {
      some: {
        tag_id: tagId
      }
    }
  }

  // Search (on content)
  const contentFilter = search
    ? {
        current_version: {
          content: {
            stem_text: {
              contains: search,
              mode: 'insensitive'
            }
          }
        }
      }
    : {}

  const [questions, total] = await this.prisma.$transaction([
    this.prisma.question.findMany({
      where: {
        ...where,
        ...contentFilter
      },
      include: {
        current_version: {
          include: {
            content: true,
            options: true
          }
        },
        concepts: true,
        tags: true
      },
      skip,
      take: limit,
      orderBy: {
        created_at: 'desc'
      }
    }),
    this.prisma.question.count({
      where: {
        ...where,
        ...contentFilter
      }
    })
  ])

  return {
    data: questions,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
} 

async getQuestionById(id: string, user: any) {
  const question = await this.prisma.question.findFirst({
    where: {
      id,
      tenant_id: user.tenantId
    },
    include: {
      current_version: {
        include: {
          content: true,
          options: true
        }
      },
      concepts: true,
      tags: true
    }
  })

  if (!question) {
    throw new NotFoundException('Question not found')
  }

  return question
}

}