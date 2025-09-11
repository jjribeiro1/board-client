"use client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "@/lib/dayjs";

type ColumnData = {
  id: string;
  name: string;
  color: string;
  isSystemDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  organizationId: string | null;
};

export const tagsColumns: ColumnDef<ColumnData>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },

  {
    accessorKey: "createdAt",
    header: "Criada em",
    cell: ({ row }) => <div>{dayjs(row.original.createdAt).format("DD/MM/YYYY")}</div>,
  },
];
