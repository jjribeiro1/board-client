import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "nome deve ter no mínimo 1 caractere" })
    .max(140, { message: "nome deve ter no máximo 140 caracteres" }),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
