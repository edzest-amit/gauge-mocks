import * as dotenv from 'dotenv'
dotenv.config()

console.log('DATABASE_URL:', process.env.DATABASE_URL)

import { defineConfig } from '@prisma/config'


export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
})