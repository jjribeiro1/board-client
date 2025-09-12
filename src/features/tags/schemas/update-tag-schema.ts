import { z } from "zod";

export const updateTagSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").optional(),
  color: z.string().min(1, "Cor é obrigatória").regex(/^#[0-9A-Fa-f]{6}$/, "Cor deve estar em formato hexadecimal válido").optional(),
});

export type UpdateTagInput = z.infer<typeof updateTagSchema>;
