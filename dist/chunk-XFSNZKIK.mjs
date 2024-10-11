// src/schemas/get-account-by-doc.ts
import { z } from "zod";
var getAccountDocSchema = z.object(
  {
    document: z.string().min(11, { message: "Documento invalido" }).max(11, { message: "Documento invalido" })
  }
);

export {
  getAccountDocSchema
};
