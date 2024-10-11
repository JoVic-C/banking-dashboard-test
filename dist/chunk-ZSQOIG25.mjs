import {
  createTenant
} from "./chunk-C5PNGNTK.mjs";

// src/controllers/tenant.ts
var getMock = async (req, res) => {
  const isMock = req.headers["x-mock"] === "true";
  if (isMock) {
    const newTenant = await createTenant();
    if (!newTenant) {
      return res.status(404).json({ error: "N\xE3o autorizado" });
    }
    return res.status(201).json(newTenant);
  }
  return res.status(401).json({ error: "N\xE3o autorizado" });
};

export {
  getMock
};
