// src/schemas/transfer-internal.ts
import { z } from "zod";
var transferInternalSchema = z.object(
  {
    amount: z.number().positive(),
    description: z.string(),
    targetAccountId: z.string().uuid({ message: "Conta invalida" }),
    sourceAccountId: z.string().uuid({ message: "Conta invalida" })
  }
);

export {
  transferInternalSchema
};
