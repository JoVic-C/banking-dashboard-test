/*
  Warnings:

  - A unique constraint covering the columns `[e2eId]` on the table `Pix` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `e2eId` to the `Pix` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pix" ADD COLUMN     "e2eId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pix_e2eId_key" ON "Pix"("e2eId");
