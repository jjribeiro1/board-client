import { z } from "zod";

export const createRoadmapSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(140, "Nome deve ter no máximo 140 caracteres"),
  description: z.string().optional(),
  organizationId: z.string().min(1, "ID da organização é obrigatório"),
});

export type CreateRoadmapInput = z.infer<typeof createRoadmapSchema>;
