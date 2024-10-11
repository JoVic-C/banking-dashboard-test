-- CreateTable
CREATE TABLE "Internal" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "targetAccountId" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Internal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Internal" ADD CONSTRAINT "Internal_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
