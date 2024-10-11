/*
  Warnings:

  - The primary key for the `Billet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `amount` to the `Billet` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Billet` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Billet" DROP CONSTRAINT "Billet_pkey",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Billet_pkey" PRIMARY KEY ("id");
