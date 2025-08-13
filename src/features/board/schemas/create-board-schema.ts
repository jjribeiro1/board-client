import { z } from "zod";

export const createBoardSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  organizationId: z.string().min(1, "ID da organização é obrigatório"),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>;
