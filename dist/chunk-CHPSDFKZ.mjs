// src/schemas/create-account.ts
import { z } from "zod";
var createAccountSchema = z.object({
  accountType: z.enum(["PERSONAL", "BUSINESS"]),
  name: z.string(),
  document: z.string().min(11, { message: "Documento invalido" }).max(11, { message: "Documento invalido" }).transform((val) => val.replace(/\.|-/gm, ""))
});

export {
  createAccountSchema
};
