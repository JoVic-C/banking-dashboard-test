// src/schemas/create-billet.ts
import { z } from "zod";
var createBilletSchema = z.object({
  amount: z.number(),
  billetCode: z.string(),
  dueDate: z.string().date()
});

export {
  createBilletSchema
};
