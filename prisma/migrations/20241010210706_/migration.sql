/*
  Warnings:

  - The primary key for the `Pix` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Pix` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `transactionId` on table `Pix` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Pix" DROP CONSTRAINT "Pix_transactionId_fkey";

-- AlterTable
ALTER TABLE "Pix" DROP CONSTRAINT "Pix_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "transactionId" SET NOT NULL,
ADD CONSTRAINT "Pix_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Pix" ADD CONSTRAINT "Pix_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
