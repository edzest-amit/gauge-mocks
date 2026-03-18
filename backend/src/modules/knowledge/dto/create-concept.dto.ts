import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateConceptDto {

  @IsString()
  topicId: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

}