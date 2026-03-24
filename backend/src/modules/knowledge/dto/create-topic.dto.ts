import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateTopicDto {

  @IsString()
  subjectId: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

}