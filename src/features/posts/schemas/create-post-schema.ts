import { z } from "zod";

const basePostSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  boardId: z.string().uuid({ message: "board inválido" }),
});

export const createPostUserSchema = basePostSchema;

export const createPostAdminSchema = basePostSchema.extend({
  statusId: z.string().uuid({ message: "status inválido" }),
  tagIds: z.array(z.string().uuid({ message: "tag inválida" })).optional(),
  isPrivate: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  isLocked: z.boolean().optional(),
});

export type CreatePostUserInput = z.infer<typeof createPostUserSchema>;
export type CreatePostAdminInput = z.infer<typeof createPostAdminSchema>;
export type CreatePostInput = CreatePostUserInput | CreatePostAdminInput;
