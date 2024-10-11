/*
  Warnings:

  - You are about to drop the column `amount` on the `Pix` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Pix` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pix" DROP CONSTRAINT "Pix_transactionId_fkey";

-- AlterTable
ALTER TABLE "Pix" DROP COLUMN "amount",
DROP COLUMN "transactionId";

-- CreateTable
CREATE TABLE "TransferPix" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,
    "pixKey" TEXT NOT NULL,
    "e2eId" TEXT NOT NULL,

    CONSTRAINT "TransferPix_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransferPix_pixKey_key" ON "TransferPix"("pixKey");

-- CreateIndex
CREATE UNIQUE INDEX "TransferPix_e2eId_key" ON "TransferPix"("e2eId");

-- AddForeignKey
ALTER TABLE "TransferPix" ADD CONSTRAINT "TransferPix_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
