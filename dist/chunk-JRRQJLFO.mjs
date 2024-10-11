import {
  prisma
} from "./chunk-4C7UQITC.mjs";

// src/utils/jwt.ts
import jwt from "jsonwebtoken";
var createJWT = (clientId, clientSecret) => {
  return jwt.sign({ clientId, clientSecret }, process.env.JWT_SECRET, { expiresIn: "2h" });
};
var verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Acesso negado" });
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    async (error, decoded) => {
      if (error) return res.status(401).json({ error: "Acesso negado" });
      const tentant = await prisma.tenant.findFirst({ where: { clientId: decoded.clientId } });
      if (!tentant) return res.status(401).json({ error: "Acesso negado" });
      req.tenant = tentant.clientId;
      next();
    }
  );
};
var verifyXPayer = async (req, res, next) => {
  const payerDocument = req.headers["x-payer-id"];
  const account = await prisma.account.findFirst({
    where: { document: payerDocument }
  });
  if (!account) {
    return res.status(403).json({ error: "Pagador n\xE3o encontrado" });
  }
  req.body.payerAccount = account;
  next();
};

export {
  createJWT,
  verifyJWT,
  verifyXPayer
};
