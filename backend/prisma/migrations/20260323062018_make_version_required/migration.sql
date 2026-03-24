/*
  Warnings:

  - Made the column `version_id` on table `ExamAttemptAnswer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ExamAttemptAnswer" DROP CONSTRAINT "ExamAttemptAnswer_version_id_fkey";

-- AlterTable
ALTER TABLE "ExamAttemptAnswer" ALTER COLUMN "version_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ExamAttemptAnswer" ADD CONSTRAINT "ExamAttemptAnswer_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "QuestionVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
