import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class QuestionRepository {
  constructor(private prisma: PrismaService) {}

  async createQuestion(data: any) {
    return this.prisma.question.create({ data })
  }

  async createVersion(data: any) {
    return this.prisma.questionVersion.create({ data })
  }

  async updateQuestion(id: string, data: any) {
    return this.prisma.question.update({
      where: { id },
      data
    })
  }

  async getQuestionWithCurrentVersion(questionId: string) {
  return this.prisma.question.findUnique({
    where: { id: questionId },
    include: {
      versions: true
    }
  })
  }

  async getVersion(versionId: string) {
  return this.prisma.questionVersion.findUnique({
    where: { id: versionId },
    include: {
      content: true,
      options: true,
      numeric_answer: true,
      media: true
    }
  })
  }

}