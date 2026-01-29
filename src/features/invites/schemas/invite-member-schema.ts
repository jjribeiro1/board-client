import { z } from "zod";

export const inviteMemberSchema = z.object({
  email: z.string().email({ message: "email inválido" }),
  organizationId: z.string(),
  role: z.enum(["MEMBER"], { message: "role inválida" }),
});

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
