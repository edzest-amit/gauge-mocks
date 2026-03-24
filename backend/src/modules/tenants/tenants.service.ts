import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ConflictException } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class TenantsService {

  constructor(private prisma: PrismaService) {}



  async createTenant(
  name: string,
  slug: string,
  adminEmail: string,
  adminPassword: string
) {

  const existing = await this.prisma.tenant.findUnique({
    where: { slug }
  })

  if (existing) {
    throw new ConflictException('Tenant slug already exists')
  }

  const result = await this.prisma.$transaction(async (tx) => {

    const tenant = await tx.tenant.create({
      data: {
        name,
        slug
      }
    })

    await tx.role.createMany({
      data: [
        { name: 'tenant_admin', tenant_id: tenant.id, scope: 'TENANT' },
        { name: 'teacher', tenant_id: tenant.id, scope: 'TENANT' },
        { name: 'student', tenant_id: tenant.id, scope: 'TENANT' }
      ]
    })

    const passwordHash = await argon2.hash(adminPassword)

    const adminUser = await tx.user.create({
      data: {
        email: adminEmail,
        password_hash: passwordHash,
        tenant_id: tenant.id
      }
    })

    const adminRole = await tx.role.findFirst({
      where: {
        tenant_id: tenant.id,
        name: 'tenant_admin'
      }
    })

    await tx.userRole.create({
      data: {
        user_id: adminUser.id,
        role_id: adminRole!.id
      }
    })

    return tenant
  })

  return result
}

  async getTenants() 
  {
    return this.prisma.tenant.findMany({
    include: {
      users: {
        include: {
          user_roles: {
            include: { role: true }
          }
        }
      }
    },
    orderBy: { created_at: 'desc' }
    })
  }

}
