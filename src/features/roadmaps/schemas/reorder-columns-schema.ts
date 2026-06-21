import { z } from "zod";

export const reorderColumnsSchema = z.object({
  columns: z
    .array(
      z.object({
        id: z.string().min(1, "ID da coluna é obrigatório"),
        order: z.number(),
      }),
    )
    .min(1, "Pelo menos uma coluna é necessária"),
});

export type ReorderColumnsInput = z.infer<typeof reorderColumnsSchema>;
