// src/schemas/get-account-by-id.ts
import { z } from "zod";
var getAccountSchema = z.object(
  {
    id: z.string().uuid({ message: "Usuario n\xE3o existe" })
  }
);

export {
  getAccountSchema
};
