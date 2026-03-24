import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../database/prisma.service'

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  // ---------------- START EXAM ----------------
  async startExam(user: any, body: any) {
  const { conceptIds = [], numQuestions = 10 } = body || {}

  const where: any = {
    tenant_id: user.tenantId,
    current_version: {
      status: 'published',
    },
  }

  // ✅ Filter by concept if provided
  if (conceptIds.length > 0) {
    where.concepts = {
      some: {
        concept_id: {
          in: conceptIds
        }
      }
    }
  }

  const questions = await this.prisma.question.findMany({
    where,
    include: {
      current_version: {
        include: {
          content: true,
          options: true,
        },
      },
    },
    take: numQuestions,
  })

  const attempt = await this.prisma.examAttempt.create({
    data: {
      user_id: user.userId,
      tenant_id: user.tenantId,
    },
  })

  return {
    attemptId: attempt.id,
    questions,
  }
}

  // ---------------- SUBMIT EXAM ----------------
  async submitExam(user: any, payload: any) {
    const { attemptId, answers } = payload

    // ✅ Validate attempt
    const attempt = await this.prisma.examAttempt.findFirst({
      where: {
        id: attemptId,
        user_id: user.userId,
        tenant_id: user.tenantId,
      },
    })

    if (!attempt) {
      throw new Error('Invalid attempt')
    }

    const questionIds = Object.keys(answers)

    const questions = await this.prisma.question.findMany({
      where: {
        id: { in: questionIds },
        tenant_id: user.tenantId,
      },
      include: {
        current_version: {
          include: {
            options: true,
            content: true,
          },
        },

        // ✅ ADD THIS BLOCK (critical)
        concepts: {
          include: {
            concept: true,
          },
        },
      },
    })

    let score = 0

    // ✅ STEP 1 — Build results safely
    const results = questions
      .map((q) => {
        if (!q.current_version) {
          return null
        }

        const selectedOptionId = answers[q.id] || null

        const options = q.current_version.options

        const correctOption = options.find((opt) => opt.is_correct)
        const selectedOption = options.find((opt) => opt.id === selectedOptionId)

        const isCorrect = correctOption?.id === selectedOptionId

        if (isCorrect) score++

        // ✅ EXTRACT CONCEPT NAME
        const conceptName =
          q.concepts?.[0]?.concept?.name || 'General'

        return {
          questionId: q.id,
          versionId: q.current_version.id,

          questionText:
            q.current_version.content?.stem_text || 'No question text',

          selectedOptionId: selectedOption?.id || null,
          selectedOptionText: selectedOption?.option_text || 'Not answered',

          correctOptionText: correctOption?.option_text || 'N/A',

          explanation: q.current_version.content?.explanation || '',

          isCorrect,

          // ✅ ADD THIS
          conceptName,
        }
      })
      .filter((r): r is NonNullable<typeof r> => r !== null)

    const total = results.length

    // ✅ STEP 2 — Prepare DB payload
    const validResults = results.map((r) => ({
      attempt_id: attemptId,
      question_id: r.questionId,
      version_id: r.versionId,
      selected_option_id: r.selectedOptionId ?? null,
      is_correct: r.isCorrect,
    }))

    // ✅ STEP 3 — Save answers
    try {
      await this.prisma.examAttemptAnswer.createMany({
        data: validResults,
      })
    } catch (error) {
      console.error('DB ERROR:', error)
      throw error
    }

    // ✅ STEP 4 — Update attempt
    await this.prisma.examAttempt.update({
      where: { id: attemptId },
      data: {
        status: 'submitted',
      },
    })

    return {
      total,
      score,
      results,
    }
  }
}