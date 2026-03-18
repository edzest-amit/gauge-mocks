import { IsString, MinLength, Matches } from 'class-validator'

export class CreateTenantDto {

  @IsString()
  @MinLength(3)
  name: string

  @IsString()
  @MinLength(3)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug must contain lowercase letters, numbers, or hyphens'
  })
  slug: string
}