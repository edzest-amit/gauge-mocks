
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';


@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('register')
register(@Body() dto: RegisterDto) {
  return this.authService.register(
    dto.email,
    dto.password,
    dto.tenantId,
    dto.role
  )
}

  @Post('login')
login(@Body() dto: LoginDto) {
  return this.authService.login(dto.email, dto.password)
}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('tenant_admin')
  @Get('users')
  getUsers(@Request() req) {
  return this.authService.getUsers(req.user.tenantId)
  }

}

