import {
  prisma
} from "./chunk-4C7UQITC.mjs";

// src/services/transactions.ts
var createTransaction = async (data) => {
  const transaction = await prisma.transaction.create({
    data
  });
  return transaction;
};
var createTransferTed = async (data) => {
  const transactionTed = await prisma.ted.create({
    data,
    select: {
      amount: true,
      recipientName: true,
      recipientDocument: true,
      recipientBank: true,
      recipientBranch: true,
      recipientAccount: true,
      description: true
    }
  });
  return transactionTed;
};
var createTransferDoc = async (data) => {
  const transactionDoc = await prisma.doc.create({
    data,
    select: {
      amount: true,
      recipientName: true,
      recipientDocument: true,
      recipientBank: true,
      recipientBranch: true,
      recipientAccount: true,
      description: true
    }
  });
  return transactionDoc;
};
var findPixKey = async (pixKey) => {
  const pixRecipient = await prisma.pix.findFirst({
    where: {
      pixKey
    },
    select: {
      id: true,
      pixKey: true,
      recipientName: true,
      recipientDocument: true,
      e2eId: true
    }
  });
  return pixRecipient;
};
var createTransferPix = async (data) => {
  const transferPix = await prisma.transferPix.create({
    data
  });
  return transferPix;
};
var createTransferInternal = async (data) => {
  const transferInternal = await prisma.internal.create({
    data
  });
  return transferInternal;
};

export {
  createTransaction,
  createTransferTed,
  createTransferDoc,
  findPixKey,
  createTransferPix,
  createTransferInternal
};
