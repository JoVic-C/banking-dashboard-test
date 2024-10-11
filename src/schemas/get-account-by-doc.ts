import { z } from "zod";

export const getAccountDocSchema = z.object({
    document: z
                .string()
                .min(11, {message: 'Documento invalido'})
                .max(11, {message: 'Documento invalido'})
                
}

)