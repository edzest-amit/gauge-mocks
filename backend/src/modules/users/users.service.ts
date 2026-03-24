import { Injectable, ConflictException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import * as argon2 from 'argon2'

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  async createUser(tenantId: string, email: string, password: string, roleName: string) {

    const existing = await this.prisma.user.findFirst({
      where: {
        email,
        tenant_id: tenantId
      }
    })

    if (existing) {
      throw new ConflictException('User already exists')
    }

    const passwordHash = await argon2.hash(password)

    const user = await this.prisma.user.create({
      data: {
        email,
        password_hash: passwordHash,
        tenant_id: tenantId
      }
    })

    const role = await this.prisma.role.findFirst({
      where: {
        tenant_id: tenantId,
        name: roleName
      }
    })

    await this.prisma.userRole.create({
      data: {
        user_id: user.id,
        role_id: role!.id
      }
    })

    return user
  }

  async getUsers(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenant_id: tenantId },
      include: {
        user_roles: {
          include: { role: true }
        }
      }
    })
  }
}