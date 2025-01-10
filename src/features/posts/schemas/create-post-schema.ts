import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Título deve ter entre 3 e 200 caracteres" })
    .max(200, { message: "Título deve ter entre 3 e 200 caracteres" }),
  description: z
    .string()
    .min(3, { message: "Descrição deve ter entre 3 e 300 caracteres" })
    .max(300, { message: "Descrição deve ter entre 3 e 300 caracteres" }),
  isPrivate: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  isLocked: z.boolean().optional(),
  boardId: z.string().uuid({ message: "board inválido" }),
  statusId: z.string().uuid({ message: "status inválido" }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
