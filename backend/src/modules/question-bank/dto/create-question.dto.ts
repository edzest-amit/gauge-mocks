import { IsEnum } from 'class-validator'
import { QuestionType, DifficultyLevel } from '@prisma/client'

export class CreateQuestionDto {
  @IsEnum(QuestionType)
  questionType: QuestionType

  @IsEnum(DifficultyLevel)
  difficultyLevel: DifficultyLevel
}