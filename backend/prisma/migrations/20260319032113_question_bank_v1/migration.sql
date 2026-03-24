/*
  Warnings:

  - The primary key for the `UserRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserRole` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MCQ', 'MULTI_SELECT', 'NUMERIC', 'DRAG_DROP', 'HOTSPOT', 'PASSAGE');

-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('draft', 'in_review', 'published', 'archived');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('easy', 'medium', 'hard');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT', 'SVG');

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_role_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_user_id_fkey";

-- AlterTable
ALTER TABLE "Concept" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_pkey",
DROP COLUMN "id",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "UserRole_pkey" PRIMARY KEY ("user_id", "role_id");

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "media_type" "MediaType" NOT NULL,
    "file_size" INTEGER NOT NULL,
    "uploaded_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionMedia" (
    "id" TEXT NOT NULL,
    "version_id" TEXT NOT NULL,
    "media_asset_id" TEXT NOT NULL,
    "display_order" INTEGER,

    CONSTRAINT "QuestionMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassageMedia" (
    "id" TEXT NOT NULL,
    "passage_id" TEXT NOT NULL,
    "media_asset_id" TEXT NOT NULL,
    "display_order" INTEGER,

    CONSTRAINT "PassageMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passage" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "current_version_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionVersion" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "version_number" INTEGER NOT NULL,
    "question_type" "QuestionType" NOT NULL,
    "status" "QuestionStatus" NOT NULL,
    "difficulty_level" "DifficultyLevel" NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionContent" (
    "id" TEXT NOT NULL,
    "version_id" TEXT NOT NULL,
    "stem_text" TEXT NOT NULL,
    "explanation" TEXT,
    "passage_id" TEXT,

    CONSTRAINT "QuestionContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" TEXT NOT NULL,
    "version_id" TEXT NOT NULL,
    "option_text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "option_order" INTEGER NOT NULL,
    "metadata_json" JSONB,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionNumericAnswer" (
    "id" TEXT NOT NULL,
    "version_id" TEXT NOT NULL,
    "correct_value" DOUBLE PRECISION NOT NULL,
    "tolerance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "QuestionNumericAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionConcept" (
    "question_id" TEXT NOT NULL,
    "concept_id" TEXT NOT NULL,

    CONSTRAINT "QuestionConcept_pkey" PRIMARY KEY ("question_id","concept_id")
);

-- CreateTable
CREATE TABLE "TagCategory" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionTag" (
    "question_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "QuestionTag_pkey" PRIMARY KEY ("question_id","tag_id")
);

-- CreateTable
CREATE TABLE "QuestionDifficulty" (
    "question_id" TEXT NOT NULL,
    "difficulty_score" DOUBLE PRECISION NOT NULL,
    "last_calculated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionDifficulty_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "QuestionStats" (
    "question_id" TEXT NOT NULL,
    "attempt_count" INTEGER NOT NULL DEFAULT 0,
    "correct_count" INTEGER NOT NULL DEFAULT 0,
    "avg_time_seconds" DOUBLE PRECISION,
    "last_attempt_at" TIMESTAMP(3),

    CONSTRAINT "QuestionStats_pkey" PRIMARY KEY ("question_id")
);

-- CreateIndex
CREATE INDEX "MediaAsset_tenant_id_idx" ON "MediaAsset"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_tenant_id_file_url_key" ON "MediaAsset"("tenant_id", "file_url");

-- CreateIndex
CREATE INDEX "QuestionMedia_version_id_media_asset_id_idx" ON "QuestionMedia"("version_id", "media_asset_id");

-- CreateIndex
CREATE INDEX "PassageMedia_passage_id_idx" ON "PassageMedia"("passage_id");

-- CreateIndex
CREATE INDEX "Passage_tenant_id_idx" ON "Passage"("tenant_id");

-- CreateIndex
CREATE INDEX "Passage_tenant_id_created_by_idx" ON "Passage"("tenant_id", "created_by");

-- CreateIndex
CREATE INDEX "Question_tenant_id_created_by_idx" ON "Question"("tenant_id", "created_by");

-- CreateIndex
CREATE INDEX "QuestionVersion_question_id_status_idx" ON "QuestionVersion"("question_id", "status");

-- CreateIndex
CREATE INDEX "QuestionVersion_status_question_type_idx" ON "QuestionVersion"("status", "question_type");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionVersion_question_id_version_number_key" ON "QuestionVersion"("question_id", "version_number");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionContent_version_id_key" ON "QuestionContent"("version_id");

-- CreateIndex
CREATE INDEX "QuestionContent_passage_id_idx" ON "QuestionContent"("passage_id");

-- CreateIndex
CREATE INDEX "QuestionOption_version_id_idx" ON "QuestionOption"("version_id");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionNumericAnswer_version_id_key" ON "QuestionNumericAnswer"("version_id");

-- CreateIndex
CREATE INDEX "QuestionConcept_concept_id_question_id_idx" ON "QuestionConcept"("concept_id", "question_id");

-- CreateIndex
CREATE INDEX "QuestionConcept_question_id_idx" ON "QuestionConcept"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "TagCategory_name_tenant_id_key" ON "TagCategory"("name", "tenant_id");

-- CreateIndex
CREATE INDEX "Tag_category_id_idx" ON "Tag"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_category_id_name_key" ON "Tag"("category_id", "name");

-- CreateIndex
CREATE INDEX "QuestionTag_question_id_tag_id_idx" ON "QuestionTag"("question_id", "tag_id");

-- CreateIndex
CREATE INDEX "QuestionTag_tag_id_idx" ON "QuestionTag"("tag_id");

-- CreateIndex
CREATE INDEX "QuestionDifficulty_difficulty_score_question_id_idx" ON "QuestionDifficulty"("difficulty_score", "question_id");

-- CreateIndex
CREATE INDEX "QuestionStats_attempt_count_idx" ON "QuestionStats"("attempt_count");

-- CreateIndex
CREATE INDEX "QuestionStats_correct_count_idx" ON "QuestionStats"("correct_count");

-- CreateIndex
CREATE INDEX "Role_tenant_id_idx" ON "Role"("tenant_id");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionMedia" ADD CONSTRAINT "QuestionMedia_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "QuestionVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionMedia" ADD CONSTRAINT "QuestionMedia_media_asset_id_fkey" FOREIGN KEY ("media_asset_id") REFERENCES "MediaAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassageMedia" ADD CONSTRAINT "PassageMedia_passage_id_fkey" FOREIGN KEY ("passage_id") REFERENCES "Passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassageMedia" ADD CONSTRAINT "PassageMedia_media_asset_id_fkey" FOREIGN KEY ("media_asset_id") REFERENCES "MediaAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passage" ADD CONSTRAINT "Passage_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passage" ADD CONSTRAINT "Passage_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_current_version_id_fkey" FOREIGN KEY ("current_version_id") REFERENCES "QuestionVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionVersion" ADD CONSTRAINT "QuestionVersion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionVersion" ADD CONSTRAINT "QuestionVersion_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionContent" ADD CONSTRAINT "QuestionContent_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "QuestionVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionContent" ADD CONSTRAINT "QuestionContent_passage_id_fkey" FOREIGN KEY ("passage_id") REFERENCES "Passage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "QuestionVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionNumericAnswer" ADD CONSTRAINT "QuestionNumericAnswer_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "QuestionVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionConcept" ADD CONSTRAINT "QuestionConcept_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionConcept" ADD CONSTRAINT "QuestionConcept_concept_id_fkey" FOREIGN KEY ("concept_id") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagCategory" ADD CONSTRAINT "TagCategory_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "TagCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTag" ADD CONSTRAINT "QuestionTag_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTag" ADD CONSTRAINT "QuestionTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionDifficulty" ADD CONSTRAINT "QuestionDifficulty_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionStats" ADD CONSTRAINT "QuestionStats_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
