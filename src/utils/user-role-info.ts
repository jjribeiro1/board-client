import { Role } from "@/types/user";

const roleLabels: Record<Role, string> = {
  OWNER: "Proprietário",
  ADMIN: "Administrador",
  MEMBER: "Membro",
};

export function userRoleLabel(role: Role) {
  return roleLabels[role];
}

const rolePermissions: Record<Role, string[]> = {
  OWNER: ["Acesso total"],
  ADMIN: ["Gerenciar posts", "Gerenciar boards", "Gerenciar comentários"],
  MEMBER: ["Visualizar boards"],
};

export function getRolePermissions(role: Role) {
  return rolePermissions[role] || [];
}
