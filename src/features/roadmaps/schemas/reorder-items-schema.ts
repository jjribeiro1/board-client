import { z } from "zod";

export const reorderItemsSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1, "ID do item é obrigatório"),
        order: z.number(),
      }),
    )
    .min(1, "Pelo menos um item é necessário"),
});

export type ReorderItemsInput = z.infer<typeof reorderItemsSchema>;
