-- CreateTable
CREATE TABLE "ExamAttemptAnswer" (
    "id" TEXT NOT NULL,
    "attempt_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "selected_option_id" TEXT,
    "is_correct" BOOLEAN NOT NULL,

    CONSTRAINT "ExamAttemptAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExamAttemptAnswer_attempt_id_idx" ON "ExamAttemptAnswer"("attempt_id");

-- AddForeignKey
ALTER TABLE "ExamAttemptAnswer" ADD CONSTRAINT "ExamAttemptAnswer_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "ExamAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
