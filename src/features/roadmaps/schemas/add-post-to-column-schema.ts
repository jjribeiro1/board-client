import { z } from "zod";

export const addPostToColumnSchema = z.object({
  postId: z.string().min(1, "ID do post é obrigatório"),
  order: z.number().optional(),
});

export type AddPostToColumnInput = z.infer<typeof addPostToColumnSchema>;
