import {
  createJWT
} from "./chunk-JRRQJLFO.mjs";
import {
  findTenantByIds
} from "./chunk-DJ4S4SRV.mjs";
import {
  loginSchema
} from "./chunk-FEIVDKMZ.mjs";

// src/controllers/login.ts
var login = async (req, res) => {
  const safeData = loginSchema.safeParse(req.body);
  if (!safeData.success) {
    return res.json({ error: safeData.error.flatten().fieldErrors });
  }
  ;
  const tenant = await findTenantByIds(
    safeData.data.clientId,
    safeData.data.clientSecret
  );
  if (!tenant) {
    return res.status(401).json({ error: "N\xE3o autorizado" });
  }
  const token = createJWT(
    safeData.data.clientId,
    safeData.data.clientSecret
  );
  return res.status(200).json({ access_token: token });
};

export {
  login
};
