"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TagsRowActions } from "./tags-row-actions";
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
    id: "color",
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className={"h-4 w-4 rounded"} style={{ backgroundColor: row.getValue("color") }}></div>
        <span>{row.getValue("color")}</span>
      </div>
    ),
  },

  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Criada em",
    cell: ({ row }) => <div>{dayjs(row.getValue("createdAt")).format("DD/MM/YYYY")}</div>,
  },
  {
    id: "id",
    accessorKey: "id",
    header: "Ações",
    cell: ({ row }) => <TagsRowActions tag={row.original} />,
  },
];
