import { ColumnDef } from "@tanstack/react-table";
import dayjs from "@/lib/dayjs";
import { Invite, InviteStatus } from "@/types/invite";
import { userRoleLabel } from "@/utils/user-role-info";

type ColumnData = Invite;

const inviteStatusLabel = (status: InviteStatus): string => {
  console.log(status);
  switch (status) {
    case InviteStatus.PENDING:
      return "Pendente";
    case InviteStatus.ACCEPTED:
      return "Aceito";
    case InviteStatus.EXPIRED:
      return "Expirado";
    case InviteStatus.REVOKED:
      return "Revogado";
    default:
      return "Desconhecido";
  }
};

export const organizationInvitesColumns: ColumnDef<ColumnData>[] = [
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
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{inviteStatusLabel(row.getValue("status"))}</div>,
  },
  {
    id: "invitedBy",
    accessorKey: "invitedBy",
    header: "Convidado por",
    cell: ({ row }) => {
      const invitedBy = row.getValue("invitedBy") as Invite["invitedBy"];
      return <div>{invitedBy.name}</div>;
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      return <div>{dayjs(row.getValue("createdAt")).format("DD/MM/YYYY - HH:mm")}</div>;
    },
  },
  {
    id: "expiresAt",
    accessorKey: "expiresAt",
    header: "Expira em",
    cell: ({ row }) => {
      return <div>{dayjs(row.getValue("expiresAt")).format("DD/MM/YYYY - HH:mm")}</div>;
    },
  },
  {
    id: "acceptedAt",
    accessorKey: "acceptedAt",
    header: "Aceito em",
    cell: ({ row }) => {
      const acceptedAt = row.getValue("acceptedAt") as Date | null;
      return <div>{acceptedAt ? dayjs(acceptedAt).format("DD/MM/YYYY - HH:mm") : "-"}</div>;
    },
  },
];
