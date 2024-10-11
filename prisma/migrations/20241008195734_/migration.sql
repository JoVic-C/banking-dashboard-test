-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accountType" TEXT[],
    "document" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "branch" TEXT NOT NULL DEFAULT '0001',
    "number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientDocument" TEXT NOT NULL,
    "recipientBank" TEXT NOT NULL,
    "recipientBranch" TEXT NOT NULL,
    "recipientAccount" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Pix" (
    "pixKey" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "Pix_pkey" PRIMARY KEY ("pixKey")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_clientId_key" ON "Tenant"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_clientSecret_key" ON "Tenant"("clientSecret");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pix" ADD CONSTRAINT "Pix_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
