import { z } from "zod";

export const transferPixSchema = z.object({
    amount: z.number().positive(),
    pixKey: z.string().email({message: 'Chave pix invalida'}),
    description: z.string(),
    e2eId: z.string()
}

)