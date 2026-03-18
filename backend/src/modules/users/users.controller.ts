import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { Roles } from '../../common/decorators/roles.decorator'
import { Tenant } from '../../common/decorators/tenant.decorator'

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('tenant_admin')
  @Post()
  createUser(
    @Tenant() tenantId: string,
    @Body() body: CreateUserDto
  ) {
    return this.usersService.createUser(
      tenantId,
      body.email,
      body.password,
      body.role
    )
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('tenant_admin')
  @Get()
  getUsers(@Tenant() tenantId: string) {
    return this.usersService.getUsers(tenantId)
  }
}