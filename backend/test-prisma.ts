import * as dotenv from 'dotenv'
dotenv.config()

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  const tenants = await prisma.tenant.findMany()
  console.log('✅ Prisma working:', tenants.length)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())