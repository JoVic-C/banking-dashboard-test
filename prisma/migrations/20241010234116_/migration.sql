-- DropForeignKey
ALTER TABLE "TransferPix" DROP CONSTRAINT "TransferPix_e2eId_fkey";

-- AddForeignKey
ALTER TABLE "TransferPix" ADD CONSTRAINT "TransferPix_pixKey_fkey" FOREIGN KEY ("pixKey") REFERENCES "Pix"("pixKey") ON DELETE RESTRICT ON UPDATE CASCADE;
