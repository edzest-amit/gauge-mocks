-- CreateTable
CREATE TABLE "ExamAttempt" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'in_progress',
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "ExamAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamAttemptQuestion" (
    "id" TEXT NOT NULL,
    "attempt_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "version_id" TEXT NOT NULL,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "ExamAttemptQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExamAttempt_user_id_idx" ON "ExamAttempt"("user_id");

-- CreateIndex
CREATE INDEX "ExamAttempt_tenant_id_idx" ON "ExamAttempt"("tenant_id");

-- CreateIndex
CREATE INDEX "ExamAttemptQuestion_attempt_id_idx" ON "ExamAttemptQuestion"("attempt_id");

-- CreateIndex
CREATE INDEX "ExamAttemptQuestion_question_id_idx" ON "ExamAttemptQuestion"("question_id");

-- CreateIndex
CREATE INDEX "ExamAttemptQuestion_version_id_idx" ON "ExamAttemptQuestion"("version_id");

-- AddForeignKey
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAttemptQuestion" ADD CONSTRAINT "ExamAttemptQuestion_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "ExamAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAttemptQuestion" ADD CONSTRAINT "ExamAttemptQuestion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAttemptQuestion" ADD CONSTRAINT "ExamAttemptQuestion_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "QuestionVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
