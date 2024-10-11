/*
  Warnings:

  - Added the required column `pixId` to the `TransferPix` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `TransferPix` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TransferPix" DROP CONSTRAINT "TransferPix_pixKey_fkey";

-- DropIndex
DROP INDEX "Pix_e2eId_key";

-- DropIndex
DROP INDEX "TransferPix_pixKey_key";

-- AlterTable
ALTER TABLE "TransferPix" ADD COLUMN     "pixId" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TransferPix" ADD CONSTRAINT "TransferPix_pixId_fkey" FOREIGN KEY ("pixId") REFERENCES "Pix"("id") ON DELETE CASCADE ON UPDATE CASCADE;
