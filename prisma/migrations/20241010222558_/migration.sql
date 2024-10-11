/*
  Warnings:

  - Added the required column `amount` to the `Doc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Ted` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doc" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ted" ADD COLUMN     "amount" INTEGER NOT NULL;
