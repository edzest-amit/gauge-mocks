-- CreateTable
CREATE TABLE "UserConceptStats" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "concept_id" TEXT NOT NULL,
    "total_attempts" INTEGER NOT NULL DEFAULT 0,
    "correct_attempts" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserConceptStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserConceptStats_user_id_concept_id_key" ON "UserConceptStats"("user_id", "concept_id");

-- AddForeignKey
ALTER TABLE "ExamAttemptAnswer" ADD CONSTRAINT "ExamAttemptAnswer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConceptStats" ADD CONSTRAINT "UserConceptStats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConceptStats" ADD CONSTRAINT "UserConceptStats_concept_id_fkey" FOREIGN KEY ("concept_id") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
