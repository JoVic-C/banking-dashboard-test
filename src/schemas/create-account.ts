import { z } from "zod";

export const createAccountSchema = z.object({
    accountType: z.enum(['PERSONAL', 'BUSINESS']),
    name: z.string(),
    document: z.string().min(11, {message: 'Documento invalido'}).max(11, {message: 'Documento invalido'}).transform(val => val.replace(/\.|-/gm, ''))
})