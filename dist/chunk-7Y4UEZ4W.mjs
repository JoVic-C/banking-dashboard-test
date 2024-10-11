// src/schemas/transfer-ted.ts
import { z } from "zod";
var tranferTedSchema = z.object({
  amount: z.number().positive(),
  recipientName: z.string(),
  recipientDocument: z.string(),
  recipientBank: z.string(),
  recipientBranch: z.string(),
  recipientAccount: z.string(),
  description: z.string()
});

export {
  tranferTedSchema
};
