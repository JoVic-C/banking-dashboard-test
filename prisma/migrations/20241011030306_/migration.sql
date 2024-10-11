-- DropForeignKey
ALTER TABLE "Doc" DROP CONSTRAINT "Doc_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Internal" DROP CONSTRAINT "Internal_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Ted" DROP CONSTRAINT "Ted_transactionId_fkey";

-- AddForeignKey
ALTER TABLE "Ted" ADD CONSTRAINT "Ted_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doc" ADD CONSTRAINT "Doc_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Internal" ADD CONSTRAINT "Internal_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
