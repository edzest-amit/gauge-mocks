import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateSubjectDto {

  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

}