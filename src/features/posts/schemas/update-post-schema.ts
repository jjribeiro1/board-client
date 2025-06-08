import { z } from "zod";

export const updatePostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Título deve ter entre 3 e 200 caracteres" })
    .max(200, { message: "Título deve ter entre 3 e 200 caracteres" }),
  description: z
    .string()
    .min(3, { message: "Descrição deve ter entre 3 e 300 caracteres" })
    .max(300, { message: "Descrição deve ter entre 3 e 300 caracteres" }),
});

export type UpdatePostInput = z.infer<typeof updatePostSchema>;
