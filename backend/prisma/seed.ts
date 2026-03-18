import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {

  const password = await argon2.hash('password123')

  const tenant = await prisma.tenant.create({
    data: {
      name: 'Platform',
      slug: 'platform'
    }
  })

  const role = await prisma.role.create({
    data: {
      name: 'super_admin',
      scope: 'PLATFORM',
      tenant_id: tenant.id
    }
  })

  const user = await prisma.user.create({
    data: {
      email: 'superadmin@platform.com',
      password_hash: password,
      tenant_id: tenant.id
    }
  })

  await prisma.userRole.create({
    data: {
      user_id: user.id,
      role_id: role.id
    }
  })

  console.log('Super admin created')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())