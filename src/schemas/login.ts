import { z } from "zod";

export const loginSchema = z.object({
    clientId: z.string(),
    clientSecret: z.string()
})