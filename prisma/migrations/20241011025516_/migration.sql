/*
  Warnings:

  - Added the required column `sourceAccountId` to the `Internal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Internal" ADD COLUMN     "sourceAccountId" TEXT NOT NULL;
