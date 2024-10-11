import { z } from "zod";

export const createBilletSchema = z.object({
    amount: z.number(),
    billetCode: z.string(),
    dueDate: z.string().date()
})