/*
  Warnings:

  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recipientAccount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recipientBank` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recipientBranch` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recipientDocument` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recipientName` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Billet" DROP CONSTRAINT "Billet_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Pix" DROP CONSTRAINT "Pix_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_accountId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount",
DROP COLUMN "description",
DROP COLUMN "recipientAccount",
DROP COLUMN "recipientBank",
DROP COLUMN "recipientBranch",
DROP COLUMN "recipientDocument",
DROP COLUMN "recipientName";

-- CreateTable
CREATE TABLE "Ted" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "Ted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doc" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "Doc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ted" ADD CONSTRAINT "Ted_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doc" ADD CONSTRAINT "Doc_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billet" ADD CONSTRAINT "Billet_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pix" ADD CONSTRAINT "Pix_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
