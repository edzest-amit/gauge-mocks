import { IsArray, IsUUID } from 'class-validator'

export class AddTagDto {
  @IsArray()
  @IsUUID('all', { each: true })
  tagIds: string[]
}