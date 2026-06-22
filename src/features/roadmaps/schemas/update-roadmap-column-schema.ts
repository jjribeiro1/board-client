import { z } from "zod";

export const updateRoadmapColumnSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres").optional(),
  color: z
    .string()
    .min(1, "Cor é obrigatória")
    .regex(/^#[0-9A-Fa-f]{6}$/, "Cor deve estar em formato hexadecimal válido")
    .optional(),
  order: z.number().optional(),
});

export type UpdateRoadmapColumnInput = z.infer<typeof updateRoadmapColumnSchema>;
