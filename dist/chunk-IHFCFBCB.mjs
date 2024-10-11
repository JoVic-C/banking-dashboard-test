import {
  createAccount,
  getAccountByDoc,
  getAccountById,
  getStatement
} from "./chunk-TGX4ASNN.mjs";
import {
  login
} from "./chunk-ZKXYW5IQ.mjs";
import {
  verifyJWT,
  verifyXPayer
} from "./chunk-JRRQJLFO.mjs";
import {
  getMock
} from "./chunk-MENTVLAB.mjs";
import {
  createBillet,
  getPixKey,
  tranferInternal,
  transferDoc,
  transferPix,
  transferTed
} from "./chunk-YSYVUHV6.mjs";

// src/routes/main.ts
import { Router } from "express";
var mainRouter = Router();
mainRouter.post("/tenant", getMock);
mainRouter.post("/auth/login", login);
mainRouter.post("/account", verifyJWT, createAccount);
mainRouter.get("/account/:id", verifyJWT, getAccountById);
mainRouter.get("/account/:id/statement", verifyJWT, getStatement);
mainRouter.get("/account/document/:document", verifyJWT, getAccountByDoc);
mainRouter.post("/transaction/ted", verifyJWT, verifyXPayer, transferTed);
mainRouter.post("/transaction/doc", verifyJWT, verifyXPayer, transferDoc);
mainRouter.post("/transaction/billet", verifyJWT, verifyXPayer, createBillet);
mainRouter.get("/transaction/pix/:pixKey", verifyJWT, verifyXPayer, getPixKey);
mainRouter.post("/transaction/pix/:accountId/pay", verifyJWT, verifyXPayer, transferPix);
mainRouter.post("/transaction/internal", verifyJWT, verifyXPayer, tranferInternal);
var main_default = mainRouter;

export {
  main_default
};
