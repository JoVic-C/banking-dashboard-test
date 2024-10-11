/*
  Warnings:

  - Added the required column `description` to the `Billet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Billet" DROP CONSTRAINT "Billet_accountId_fkey";

-- AlterTable
ALTER TABLE "Billet" ADD COLUMN     "description" TEXT NOT NULL;
