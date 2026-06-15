import { z } from "zod";

export const updatePostSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Título é obrigatório" }),
  description: z
    .string()
    .min(1, { message: "Descrição é obrigatória" }),
});

export type UpdatePostInput = z.infer<typeof updatePostSchema>;
