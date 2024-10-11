import { z } from "zod";

export const getPixKeySchema = z.object({
    pixKey: z.string().email({message: 'Chave pix invalida'})
}

)