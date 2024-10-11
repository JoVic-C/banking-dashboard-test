import {
  prisma
} from "./chunk-4C7UQITC.mjs";

// src/services/auth.ts
var createTenant = async (data) => {
  const tenant = await prisma.tenant.create({
    data
  });
  return tenant;
};
var findTenant = async () => {
  const tenant = await prisma.tenant.findFirst({});
  return tenant;
};
var findTenantByIds = async (clientId, clientSecret) => {
  const tenant = await prisma.tenant.findFirst({
    where: {
      clientId,
      clientSecret
    }
  });
  return tenant;
};
var login = async (clientId, clientSecret) => {
};

export {
  createTenant,
  findTenant,
  findTenantByIds,
  login
};
