-- DropIndex
DROP INDEX "Pix_e2eId_key";

-- DropIndex
DROP INDEX "TransferPix_e2eId_key";

-- AlterTable
ALTER TABLE "TransferPix" ADD COLUMN     "description" TEXT;
