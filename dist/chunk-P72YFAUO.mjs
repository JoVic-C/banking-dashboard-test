// src/schemas/transfer-doc.ts
import { z } from "zod";
var tranferDocSchema = z.object({
  amount: z.number().positive(),
  recipientName: z.string(),
  recipientDocument: z.string(),
  recipientBank: z.string(),
  recipientBranch: z.string(),
  recipientAccount: z.string(),
  description: z.string()
});

export {
  tranferDocSchema
};
