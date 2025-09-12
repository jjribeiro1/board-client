import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  color: z.string().min(1, "Cor é obrigatória").regex(/^#[0-9A-Fa-f]{6}$/, "Cor deve estar em formato hexadecimal válido"),
  organizationId: z.string().min(1, "ID da organização é obrigatório"),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
