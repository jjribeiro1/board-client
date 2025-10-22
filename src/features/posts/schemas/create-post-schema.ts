import { z } from "zod";

const basePostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Título deve ter entre 3 e 200 caracteres" })
    .max(200, { message: "Título deve ter entre 3 e 200 caracteres" }),
  description: z
    .string()
    .min(3, { message: "Descrição deve ter entre 3 e 300 caracteres" })
    .max(300, { message: "Descrição deve ter entre 3 e 300 caracteres" }),
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
