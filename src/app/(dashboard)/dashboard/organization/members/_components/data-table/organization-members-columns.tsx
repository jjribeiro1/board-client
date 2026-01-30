"use client";
import { ColumnDef } from "@tanstack/react-table";
import { userRoleLabel } from "@/utils/user-role-info";
import dayjs from "@/lib/dayjs";
import { MembersRowActions } from "./members-row-actions";

type ColumnData = {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  createdAt: Date;
};

type GetColumnsParams = {
  organizationId: string;
};

export function getOrganizationMembersColumns({ organizationId }: GetColumnsParams): ColumnDef<ColumnData>[] {
  return [
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
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: "Membro desde",
      cell: ({ row }) => {
        return <div>{dayjs(row.getValue("createdAt")).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      id: "id",
      accessorKey: "id",
      header: "Ações",
      cell: ({ row }) => <MembersRowActions member={row.original} organizationId={organizationId} />,
    },
  ];
}
