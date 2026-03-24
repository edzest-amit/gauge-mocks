-- CreateEnum
CREATE TYPE "RoleScope" AS ENUM ('PLATFORM', 'TENANT');

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_tenant_id_fkey";

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "scope" "RoleScope" NOT NULL DEFAULT 'TENANT',
ALTER COLUMN "tenant_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
