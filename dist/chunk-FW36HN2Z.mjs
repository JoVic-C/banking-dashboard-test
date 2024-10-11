import {
  addBillet
} from "./chunk-AXPE7MNO.mjs";
import {
  createTransaction,
  createTransferDoc,
  createTransferInternal,
  createTransferPix,
  createTransferTed,
  findPixKey
} from "./chunk-NTLMSRR5.mjs";
import {
  generateE2EId
} from "./chunk-LZGUUL5G.mjs";
import {
  getPixKeySchema
} from "./chunk-RXPRJML7.mjs";
import {
  tranferDocSchema
} from "./chunk-P72YFAUO.mjs";
import {
  transferInternalSchema
} from "./chunk-UATPMOF3.mjs";
import {
  transferPixSchema
} from "./chunk-5VOB44NX.mjs";
import {
  tranferTedSchema
} from "./chunk-7Y4UEZ4W.mjs";
import {
  findAccountByDocument,
  findAccountById
} from "./chunk-6RS5JFHU.mjs";
import {
  prisma
} from "./chunk-4C7UQITC.mjs";
import {
  createBilletSchema
} from "./chunk-6DFRIVLO.mjs";

// src/controllers/transactions.ts
var transferTed = async (req, res) => {
  const safeData = tranferTedSchema.safeParse(req.body);
  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }
  ;
  const payer = req.headers["x-payer-id"];
  const account = await findAccountByDocument(payer);
  if ((account == null ? void 0 : account.balance) < safeData.data.amount) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }
  const transaction = await createTransaction({
    account: { connect: { id: account == null ? void 0 : account.id } }
  });
  const ted = await createTransferTed({
    transaction: { connect: { id: transaction.id } },
    amount: safeData.data.amount,
    recipientAccount: safeData.data.recipientAccount,
    recipientBank: safeData.data.recipientBank,
    recipientBranch: safeData.data.recipientBranch,
    recipientDocument: safeData.data.recipientDocument,
    recipientName: safeData.data.recipientName
  });
  const totalBalance = (account == null ? void 0 : account.balance) - ted.amount;
  await prisma.account.update({
    where: {
      id: transaction.accountId
    },
    data: {
      balance: totalBalance
    }
  });
  return res.status(201).json(ted);
};
var transferDoc = async (req, res) => {
  const safeData = tranferDocSchema.safeParse(req.body);
  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }
  ;
  const payer = req.headers["x-payer-id"];
  const account = await findAccountByDocument(payer);
  if ((account == null ? void 0 : account.balance) < safeData.data.amount) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }
  const transaction = await createTransaction({
    account: { connect: { id: account == null ? void 0 : account.id } }
  });
  const doc = await createTransferDoc({
    transaction: { connect: { id: transaction.id } },
    amount: safeData.data.amount,
    recipientAccount: safeData.data.recipientAccount,
    recipientBank: safeData.data.recipientBank,
    recipientBranch: safeData.data.recipientBranch,
    recipientDocument: safeData.data.recipientDocument,
    recipientName: safeData.data.recipientName
  });
  const totalBalance = (account == null ? void 0 : account.balance) - doc.amount;
  await prisma.account.update({
    where: {
      id: transaction.accountId
    },
    data: {
      balance: totalBalance
    }
  });
  return res.status(201).json(doc);
};
var createBillet = async (req, res) => {
  const safeData = createBilletSchema.safeParse(req.body);
  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }
  ;
  const payer = req.headers["x-payer-id"];
  const account = await findAccountByDocument(payer);
  const transaction = await createTransaction({
    account: { connect: { id: account == null ? void 0 : account.id } }
  });
  const billet = await addBillet(
    {
      billetCode: safeData.data.billetCode,
      amount: safeData.data.amount,
      dueDate: safeData.data.dueDate,
      transaction: { connect: { id: transaction.id } }
    }
  );
  if ((account == null ? void 0 : account.balance) < billet.amount) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }
  ;
  const totalBalance = (account == null ? void 0 : account.balance) - billet.amount;
  await prisma.account.update({
    where: {
      id: transaction.accountId
    },
    data: {
      balance: totalBalance
    }
  });
  return res.status(201).json(billet);
};
var getPixKey = async (req, res) => {
  const safeParams = getPixKeySchema.safeParse(req.params);
  if (!safeParams.success) {
    return res.status(400).json({ error: safeParams.error.flatten().fieldErrors });
  }
  ;
  const pixKey = await findPixKey(
    safeParams.data.pixKey
  );
  if (!pixKey) {
    return res.status(400).json({ error: "Pix n\xE3o existe" });
  }
  const newE2E = generateE2EId();
  const newBalance = await prisma.pix.update({
    data: {
      e2eId: newE2E
    },
    where: {
      id: pixKey.id
    }
  });
  return res.status(200).json(newBalance);
};
var transferPix = async (req, res) => {
  const { accountId } = req.params;
  const safeData = transferPixSchema.safeParse(req.body);
  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }
  ;
  const account = await findAccountById(accountId);
  const transaction = await createTransaction({
    account: { connect: { id: account == null ? void 0 : account.id } }
  });
  const pixKeyIsValid = await findPixKey(safeData.data.pixKey);
  if (!pixKeyIsValid) {
    return res.status(400).json({ error: "Pix invalido" });
  }
  if (safeData.data.e2eId != pixKeyIsValid.e2eId) {
    return res.status(400).json({ error: "Transa\xE7\xE3o invalida" });
  }
  ;
  const pix = await createTransferPix(
    {
      amount: safeData.data.amount,
      e2eId: safeData.data.e2eId,
      pixKey: safeData.data.pixKey,
      description: safeData.data.description,
      transaction: { connect: { id: transaction.id } },
      pix: { connect: { id: pixKeyIsValid.id } }
    }
  );
  if ((account == null ? void 0 : account.balance) < pix.amount) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }
  ;
  const totalBalance = (account == null ? void 0 : account.balance) - pix.amount;
  await prisma.account.update({
    where: {
      id: account == null ? void 0 : account.id
    },
    data: {
      balance: totalBalance
    }
  });
  return res.status(201).json(pix);
};
var tranferInternal = async (req, res) => {
  const safeData = transferInternalSchema.safeParse(req.body);
  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }
  ;
  const payer = req.headers["x-payer-id"];
  const account = await findAccountByDocument(payer);
  const transaction = await createTransaction({
    account: { connect: { id: account == null ? void 0 : account.id } }
  });
  const internal = await createTransferInternal({
    targetAccountId: safeData.data.targetAccountId,
    sourceAccountId: safeData.data.sourceAccountId,
    amount: safeData.data.amount,
    description: safeData.data.description,
    transaction: { connect: { id: transaction.id } }
  });
  if (!internal) {
    return res.status(400).json({ error: "Algo deu errado na transa\xE7\xE3o" });
  }
  if ((account == null ? void 0 : account.balance) < internal.amount) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }
  ;
  const totalBalance = (account == null ? void 0 : account.balance) - internal.amount;
  await prisma.account.update({
    where: {
      id: account == null ? void 0 : account.id
    },
    data: {
      balance: totalBalance
    }
  });
  return res.status(201).json(internal);
};

export {
  transferTed,
  transferDoc,
  createBillet,
  getPixKey,
  transferPix,
  tranferInternal
};
