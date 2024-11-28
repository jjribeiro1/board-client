import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "email inválido" })
    .max(200, { message: "email deve ter no máximo 200 caracteres" }),
  password: z
    .string()
    .min(6, { message: "senha deve ter no mínimo 6 caracteres" })
    .max(200, { message: "senha deve ter no máximo 200 caracteres" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
