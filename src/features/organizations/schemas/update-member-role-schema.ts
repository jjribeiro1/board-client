import { z } from "zod";

export const updateMemberRoleSchema = z.object({
  role: z.enum(["ADMIN", "MEMBER"], { message: "Função inválida" }),
});

export type UpdateMemberRoleInput = z.infer<typeof updateMemberRoleSchema>;
