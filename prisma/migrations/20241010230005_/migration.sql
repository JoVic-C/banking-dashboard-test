/*
  Warnings:

  - A unique constraint covering the columns `[e2eId]` on the table `Pix` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[e2eId]` on the table `TransferPix` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pix_e2eId_key" ON "Pix"("e2eId");

-- CreateIndex
CREATE UNIQUE INDEX "TransferPix_e2eId_key" ON "TransferPix"("e2eId");

-- AddForeignKey
ALTER TABLE "TransferPix" ADD CONSTRAINT "TransferPix_e2eId_fkey" FOREIGN KEY ("e2eId") REFERENCES "Pix"("e2eId") ON DELETE RESTRICT ON UPDATE CASCADE;
