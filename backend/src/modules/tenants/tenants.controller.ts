import { Controller, Post, Body, Get } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { Roles } from '../../common/decorators/roles.decorator'
import { Tenant } from 'src/common/decorators/tenant.decorator';

@Controller('tenants')
export class TenantsController {
  authService: any;

  constructor(private tenantsService: TenantsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('super_admin')

@Post()
createTenant(@Body() body: any) {

  return this.tenantsService.createTenant(
    body.name,
    body.slug,
    body.adminEmail,
    body.adminPassword
  )

  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin')
  @Get()
  getTenants() {
  return this.tenantsService.getTenants()
  }

  @Get('users')
  getUsers(@Tenant() tenantId: string) {
  return this.authService.getUsers(tenantId)
  }

}
