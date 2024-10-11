import {
  prisma
} from "./chunk-4C7UQITC.mjs";

// src/services/account.ts
var addAccount = async (accountType, name, document, tenantId) => {
  const newAccount = await prisma.account.create({
    data: {
      accountType,
      name,
      document,
      tenantId
    }
  });
  return newAccount;
};
var findAccountById = async (id) => {
  const account = await prisma.account.findFirst({
    where: {
      id
    },
    include: {
      transactions: true
    }
  });
  return account;
};
var findAccountByDocument = async (document) => {
  const account = await prisma.account.findFirst({
    where: {
      document
    }
  });
  return account;
};
var getStatementById = async (id) => {
  const account = await prisma.account.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      balance: true,
      transactions: true
    }
  });
  return account;
};

export {
  addAccount,
  findAccountById,
  findAccountByDocument,
  getStatementById
};
