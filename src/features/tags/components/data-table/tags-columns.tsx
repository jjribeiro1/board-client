"use client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "@/lib/dayjs";
import { Tag } from "@/types/tag";

type ColumnData = Tag;

export const tagsColumns: ColumnDef<ColumnData>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },

  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Criada em",
    cell: ({ row }) => <div>{dayjs(row.getValue("createdAt")).format("DD/MM/YYYY")}</div>,
  },
];
