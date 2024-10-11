import { z } from "zod";

export const transferInternalSchema = z.object({
    amount: z.number().positive(),
    description: z.string(),
    targetAccountId: z.string().uuid({message: 'Conta invalida'}),
    sourceAccountId: z.string().uuid({message: 'Conta invalida'})
}

)