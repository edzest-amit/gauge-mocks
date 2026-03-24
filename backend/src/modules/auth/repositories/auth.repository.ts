import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../database/prisma.service'

@Injectable()
export class AuthRepository {

  constructor(private prisma: PrismaService) {}

  createUser(data: any) {
    return this.prisma.user.create({ data })
  }

  getUsersByTenant(tenantId: string) {
  return this.prisma.user.findMany({
    where: { tenant_id: tenantId },
    include: {
      user_roles: {
        include: { role: true }
      }
    },
    orderBy: { created_at: 'desc' }
  })
}

  async findUserByEmail(email: string) {

  return this.prisma.user.findFirst({
    where: { email },
    include: {
      user_roles: {
        include: {
          role: true
        }
      }
    }
  })

}

  findRole(tenantId: string, roleName: string) {
    return this.prisma.role.findFirst({
      where: {
        tenant_id: tenantId,
        name: roleName
      }
    })
  }

  attachRole(userId: string, roleId: string) {
    return this.prisma.userRole.create({
      data: {
        user_id: userId,
        role_id: roleId
      }
    })
  }
}