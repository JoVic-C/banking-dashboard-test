import {
  findTenant
} from "./chunk-DJ4S4SRV.mjs";

// src/controllers/tenant.ts
var getMock = async (req, res) => {
  const isMock = req.headers["x-mock"] === "true";
  if (isMock) {
    const tenant = await findTenant();
    if (!tenant) {
      return res.status(404).json({ error: "N\xE3o autorizado" });
    }
    return res.status(201).json(tenant);
  }
  return res.status(401).json({ error: "N\xE3o autorizado" });
};

export {
  getMock
};
