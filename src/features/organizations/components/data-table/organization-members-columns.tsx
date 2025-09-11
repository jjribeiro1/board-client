import { userRoleLabel } from "@/utils/user-role-info";
import { ColumnDef } from "@tanstack/react-table";

type ColumnData = {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  createdAt: Date;
};

export const organizationMembersColumns: ColumnDef<ColumnData>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Função",
    cell: ({ row }) => <div>{userRoleLabel(row.getValue("role"))}</div>,
  },
];
