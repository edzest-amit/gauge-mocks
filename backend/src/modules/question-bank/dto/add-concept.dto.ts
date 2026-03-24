import { IsArray, IsUUID } from 'class-validator'

export class AddConceptDto {
  @IsArray()
  @IsUUID('all', { each: true })
  conceptIds: string[]
}