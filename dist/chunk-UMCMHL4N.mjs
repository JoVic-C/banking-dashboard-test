import {
  getAccountDocSchema
} from "./chunk-XFSNZKIK.mjs";
import {
  getAccountSchema
} from "./chunk-ZV5LXWBW.mjs";
import {
  findTenant
} from "./chunk-C5PNGNTK.mjs";
import {
  addAccount,
  findAccountByDocument,
  findAccountById,
  getStatementById
} from "./chunk-6RS5JFHU.mjs";
import {
  createAccountSchema
} from "./chunk-CHPSDFKZ.mjs";

// src/controllers/account.ts
var createAccount = async (req, res) => {
  const safeData = createAccountSchema.safeParse(req.body);
  if (!safeData.success) {
    return res.json({ error: safeData.error.flatten().fieldErrors });
  }
  ;
  const tenant = await findTenant();
  const tenantId = tenant == null ? void 0 : tenant.id;
  const newAccount = await addAccount(
    safeData.data.accountType,
    safeData.data.name,
    safeData.data.document,
    tenantId
  );
  return res.status(201).json({ newAccount });
};
var getAccountById = async (req, res) => {
  const safeParams = getAccountSchema.safeParse(req.params);
  if (!safeParams.success) {
    return res.status(404).json({ error: safeParams.error.flatten().fieldErrors });
  }
  ;
  const account = await findAccountById(
    safeParams.data.id
  );
  if (!account) {
    return res.status(404).json({ error: "Conta invalida" });
  }
  return res.status(200).json({ account });
};
var getAccountByDoc = async (req, res) => {
  const safeParams = getAccountDocSchema.safeParse(req.params);
  if (!safeParams.success) {
    return res.status(404).json({ error: safeParams.error.flatten().fieldErrors });
  }
  ;
  const account = await findAccountByDocument(
    safeParams.data.document
  );
  if (!account) {
    return res.status(404).json({ error: "Conta invalida" });
  }
  return res.status(200).json({ account });
};
var getStatement = async (req, res) => {
  const safeParams = getAccountSchema.safeParse(req.params);
  if (!safeParams.success) {
    return res.status(404).json({ error: safeParams.error.flatten().fieldErrors });
  }
  ;
  const account = await findAccountById(
    safeParams.data.id
  );
  if (!account) {
    return res.status(404).json({ error: "Conta invalida" });
  }
  const statement = await getStatementById(
    account.id
  );
  return res.status(200).json(statement);
};

export {
  createAccount,
  getAccountById,
  getAccountByDoc,
  getStatement
};
