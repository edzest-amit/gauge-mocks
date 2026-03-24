import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../database/prisma.service'

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  // ---------------- UPDATE PERSISTENT STATS ----------------
  async updateUserConceptStats(
    userId: string,
    conceptIds: string[],
    wasCorrect: boolean
  ) {
    for (const conceptId of conceptIds) {
      await this.prisma.userConceptStats.upsert({
        where: {
          user_id_concept_id: {
            user_id: userId,
            concept_id: conceptId,
          },
        },
        update: {
          total_attempts: { increment: 1 },
          correct_attempts: wasCorrect
            ? { increment: 1 }
            : undefined,
        },
        create: {
          user_id: userId,
          concept_id: conceptId,
          total_attempts: 1,
          correct_attempts: wasCorrect ? 1 : 0,
        },
      })
    }
  }

  // ---------------- CONCEPT ANALYTICS (PERSISTENT) ----------------
  async getConceptAnalytics(userId: string, tenantId: string) {
    const stats = await this.prisma.userConceptStats.findMany({
      where: {
        user_id: userId,
        concept: {
          tenant_id: tenantId,
        },
      },
      include: {
        concept: true,
      },
    })

    const result = stats.map(s => {
      const accuracy =
        s.total_attempts > 0
          ? s.correct_attempts / s.total_attempts
          : 0

      let level = 'WEAK'
      if (accuracy >= 0.8) level = 'STRONG'
      else if (accuracy >= 0.5) level = 'MEDIUM'

      return {
        conceptId: s.concept_id,
        conceptName: s.concept.name,
        total: s.total_attempts,
        correct: s.correct_attempts,
        accuracy,
        level,
      }
    })

    // ✅ sort weak → strong
    const levelPriority = { WEAK: 0, MEDIUM: 1, STRONG: 2 }

    result.sort((a, b) => {
      if (levelPriority[a.level] !== levelPriority[b.level]) {
        return levelPriority[a.level] - levelPriority[b.level]
      }
      return a.accuracy - b.accuracy
    })

    return result
  }

  // ---------------- PRACTICE QUESTIONS ----------------
  async getPracticeQuestions(userId: string, tenantId: string) {
    const analytics = await this.getConceptAnalytics(userId, tenantId)

    const weakConceptIds = analytics
      .filter(c => c.level === 'WEAK')
      .map(c => c.conceptId)

    if (weakConceptIds.length === 0) {
      return []
    }

    const questions = await this.prisma.question.findMany({
      where: {
        tenant_id: tenantId,
        concepts: {
          some: {
            concept_id: { in: weakConceptIds },
          },
        },
        current_version: {
          status: 'published',
        },
      },
      include: {
        current_version: {
          include: {
            content: true,
            options: true,
          },
        },
        concepts: true,
      },
      take: 10,
    })

    return questions
  }

  // ---------------- ADAPTIVE ENGINE ----------------
  async getAdaptiveQuestion(userId: string, tenantId: string, body: any) {
  const weakConcepts: string[] = body?.weakConcepts || []

  try {
    // ---------------- FETCH QUESTION ----------------
   const question = await this.prisma.question.findFirst({
  where: {
    tenant_id: tenantId,
    concepts: {
      some: {
        concept: {
          name: {
            in: weakConcepts.length > 0 ? weakConcepts : undefined
          }
        }
      }
    }
  },
  include: {
    current_version: {
      include: {
        content: true,
        options: true
      }
    }
  }
})
console.log('WEAK CONCEPTS:', weakConcepts)
    // ---------------- NO QUESTION CASE ----------------
    if (!question || !question.current_version) {
      return {
        message: 'No question available',
        data: null
      }
    }

    const version = question.current_version

    // ---------------- FORMAT RESPONSE ----------------
    return {
      id: question.id,
      stem_text: version.content?.stem_text || '',
      explanation: version.content?.explanation || '',
      options: version.options.map((o: any) => ({
        id: o.id,
        option_text: o.option_text,
        is_correct: o.is_correct
      }))
    }

  } catch (error) {
    console.error('Adaptive Question Error:', error)

    return {
      message: 'Error fetching question', 
      data: null
    }
  }
}
}