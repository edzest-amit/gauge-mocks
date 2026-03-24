-- AlterTable
ALTER TABLE "ExamAttemptAnswer" ADD COLUMN     "version_id" TEXT;

-- CreateIndex
CREATE INDEX "ExamAttemptAnswer_version_id_idx" ON "ExamAttemptAnswer"("version_id");

-- AddForeignKey
ALTER TABLE "ExamAttemptAnswer" ADD CONSTRAINT "ExamAttemptAnswer_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "QuestionVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
