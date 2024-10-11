/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "balance" SET DEFAULT 10000;

-- CreateIndex
CREATE UNIQUE INDEX "Account_document_key" ON "Account"("document");
