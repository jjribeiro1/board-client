import { z } from "zod";

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Comentário não pode estar vazio" })
    .max(1000, { message: "Comentário deve ter no máximo 1000 caracteres" }),
  postId: z.string().uuid({ message: "ID do post inválido" }),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
