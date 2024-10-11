import { z } from "zod";

export const getAccountSchema = z.object({
    id: z.string().uuid({message: 'Usuario não existe'})
}

)