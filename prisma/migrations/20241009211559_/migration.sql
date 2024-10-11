-- DropForeignKey
ALTER TABLE "Pix" DROP CONSTRAINT "Pix_transactionId_fkey";

-- AlterTable
ALTER TABLE "Pix" ALTER COLUMN "transactionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pix" ADD CONSTRAINT "Pix_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
