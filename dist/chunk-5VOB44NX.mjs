// src/schemas/transfer-pix.ts
import { z } from "zod";
var transferPixSchema = z.object(
  {
    amount: z.number().positive(),
    pixKey: z.string().email({ message: "Chave pix invalida" }),
    description: z.string(),
    e2eId: z.string()
  }
);

export {
  transferPixSchema
};
