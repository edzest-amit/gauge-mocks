import { IsOptional, IsEnum } from 'class-validator'
import { DifficultyLevel } from '@prisma/client'

export class PublishQuestionDto {
  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficultyLevel?: DifficultyLevel
}