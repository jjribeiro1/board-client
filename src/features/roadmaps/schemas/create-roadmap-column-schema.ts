import { z } from "zod";

export const createRoadmapColumnSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
  color: z
    .string()
    .min(1, "Cor é obrigatória")
    .regex(/^#[0-9A-Fa-f]{6}$/, "Cor deve estar em formato hexadecimal válido"),
  order: z.number().optional(),
});

export type CreateRoadmapColumnInput = z.infer<typeof createRoadmapColumnSchema>;
