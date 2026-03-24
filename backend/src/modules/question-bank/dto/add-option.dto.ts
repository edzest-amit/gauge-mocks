import { IsArray, ValidateNested, IsString, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'

class OptionDto {
  @IsString()
  optionText: string

  @IsBoolean()
  isCorrect: boolean
}

export class AddOptionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[]
}