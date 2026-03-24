import { IsOptional, IsEnum, IsString, IsInt } from 'class-validator'
import { Type } from 'class-transformer'
import { QuestionStatus, DifficultyLevel } from '@prisma/client'

export class GetQuestionsDto {
  @IsOptional()
  @IsEnum(QuestionStatus)
  status?: QuestionStatus

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel

  @IsOptional()
  @IsString()
  conceptId?: string

  @IsOptional()
  @IsString()
  tagId?: string

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number = 1

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit: number = 10
}