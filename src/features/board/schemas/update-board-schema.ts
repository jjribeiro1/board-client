import { z } from "zod";

export const updateBoardSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").optional(),
  description: z.string().min(1, "Descrição é obrigatória").optional(),
  isLocked: z.boolean().optional(),
});

export type UpdateBoardInput = z.infer<typeof updateBoardSchema>;
