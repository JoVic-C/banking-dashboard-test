/*
  Warnings:

  - A unique constraint covering the columns `[pixKey]` on the table `Pix` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipientAccount` to the `Doc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientBank` to the `Doc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientBranch` to the `Doc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientDocument` to the `Doc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientName` to the `Doc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientDocument` to the `Pix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientName` to the `Pix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientAccount` to the `Ted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientBank` to the `Ted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientBranch` to the `Ted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientDocument` to the `Ted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientName` to the `Ted` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doc" ADD COLUMN     "description" TEXT,
ADD COLUMN     "recipientAccount" TEXT NOT NULL,
ADD COLUMN     "recipientBank" TEXT NOT NULL,
ADD COLUMN     "recipientBranch" TEXT NOT NULL,
ADD COLUMN     "recipientDocument" TEXT NOT NULL,
ADD COLUMN     "recipientName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pix" ADD COLUMN     "recipientDocument" TEXT NOT NULL,
ADD COLUMN     "recipientName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ted" ADD COLUMN     "description" TEXT,
ADD COLUMN     "recipientAccount" TEXT NOT NULL,
ADD COLUMN     "recipientBank" TEXT NOT NULL,
ADD COLUMN     "recipientBranch" TEXT NOT NULL,
ADD COLUMN     "recipientDocument" TEXT NOT NULL,
ADD COLUMN     "recipientName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pix_pixKey_key" ON "Pix"("pixKey");
