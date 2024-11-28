import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "nome deve ter no mínimo 3 caracteres" })
      .max(200, { message: "nome deve ter no máximo 200 caracteres" }),
    email: z
      .string()
      .email({ message: "email inválido" })
      .max(200, { message: "email deve ter no máximo 200 caracteres" }),
    password: z
      .string()
      .min(6, { message: "senha deve ter no mínimo 6 caracteres" })
      .max(200, { message: "senha deve ter no máximo 200 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((ctx) => ctx.password === ctx.confirmPassword, {
    message: "confirmação de senha inválida",
    path: ["confirmPassword"],
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;
