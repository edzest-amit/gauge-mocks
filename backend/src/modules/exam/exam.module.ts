import { Module } from '@nestjs/common'
import { ExamController } from './controllers/exam.controller'
import { ExamService } from './services/exam.service'
import { PrismaService } from '../../database/prisma.service'

@Module({
  controllers: [ExamController],
  providers: [ExamService, PrismaService],
})
export class ExamModule {}