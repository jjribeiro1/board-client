import { z } from "zod";

export const updateCommentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Comentário não pode estar vazio" })
    .max(1000, { message: "Comentário deve ter no máximo 1000 caracteres" }),
});

export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
