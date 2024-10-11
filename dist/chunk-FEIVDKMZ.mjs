// src/schemas/login.ts
import { z } from "zod";
var loginSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string()
});

export {
  loginSchema
};
