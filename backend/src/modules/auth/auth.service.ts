
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {
  
  constructor(
    private prisma: PrismaService,
    private authRepo: AuthRepository,
    private jwtService: JwtService
  ) {}

  async register(email: string, password: string, tenantId: string, roleName: string) {

  const passwordHash = await argon2.hash(password)

  const user = await this.authRepo.createUser({
    email,
    password_hash: passwordHash,
    tenant_id: tenantId
  })

  const role = await this.authRepo.findRole(tenantId, roleName)

  await this.authRepo.attachRole(user.id, role!.id)

  return user
  }

  async login(email: string, password: string) {

  

  const user = await this.authRepo.findUserByEmail(email)

  if (!user) {
    throw new UnauthorizedException('Invalid credentials')
  }

  const valid = await argon2.verify(user.password_hash, password)

  if (!valid) {
    throw new UnauthorizedException('Invalid credentials')
  }

  const payload = {
    userId: user.id,
    tenantId: user.tenant_id,
    email: user.email
  }

  return {
    access_token: this.jwtService.sign(payload)
  }
}

  async getUsers(tenantId: string) {
  return this.authRepo.getUsersByTenant(tenantId)
  }

  async getProfile(userId: string) {
  return this.prisma.user.findUnique({
    where: { id: userId },
    include: {
      user_roles: {
        include: {
          role: true
        }
      }
    }
    })
  } 

}