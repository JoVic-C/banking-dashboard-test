/*
  Warnings:

  - Made the column `clientId` on table `Tenant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientSecret` on table `Tenant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "clientId" SET NOT NULL,
ALTER COLUMN "clientSecret" SET NOT NULL;
