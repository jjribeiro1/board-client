import { z } from "zod";

export const updateRoadmapSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(140, "Nome deve ter no máximo 140 caracteres")
    .optional(),
  description: z.string().optional(),
});

export type UpdateRoadmapInput = z.infer<typeof updateRoadmapSchema>;
