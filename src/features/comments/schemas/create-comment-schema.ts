import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1, { message: "Comentário não pode estar vazio" }),
  postId: z.string().uuid({ message: "ID do post inválido" }),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
