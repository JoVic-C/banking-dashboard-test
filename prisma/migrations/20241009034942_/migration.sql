-- CreateTable
CREATE TABLE "Billet" (
    "accountId" TEXT NOT NULL,
    "billetCode" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Billet_pkey" PRIMARY KEY ("accountId")
);

-- AddForeignKey
ALTER TABLE "Billet" ADD CONSTRAINT "Billet_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
