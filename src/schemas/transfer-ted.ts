import { z } from "zod";

export const tranferTedSchema = z.object({
    amount: z.number().positive(),
    recipientName: z.string(),
    recipientDocument: z.string(),
    recipientBank: z.string(),
    recipientBranch: z.string(),
    recipientAccount:  z.string(),
    description: z.string()
})