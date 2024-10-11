-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
