// src/schemas/get-pix-key.ts
import { z } from "zod";
var getPixKeySchema = z.object(
  {
    pixKey: z.string().email({ message: "Chave pix invalida" })
  }
);

export {
  getPixKeySchema
};
