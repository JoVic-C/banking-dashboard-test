/*
  Warnings:

  - You are about to drop the column `accountId` on the `Billet` table. All the data in the column will be lost.
  - Added the required column `transactionId` to the `Billet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Billet" DROP CONSTRAINT "Billet_accountId_fkey";

-- AlterTable
ALTER TABLE "Billet" DROP COLUMN "accountId",
ADD COLUMN     "transactionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Billet" ADD CONSTRAINT "Billet_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
