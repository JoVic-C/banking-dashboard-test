-- AlterTable
ALTER TABLE "Billet" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "Billet" ADD CONSTRAINT "Billet_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
