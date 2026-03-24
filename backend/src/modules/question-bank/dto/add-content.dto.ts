import { IsOptional, IsString } from 'class-validator'

export class AddContentDto {
  @IsString()
  stemText: string

  @IsOptional()
  @IsString()
  explanation?: string

  @IsOptional()
  @IsString()
  passageId?: string
}