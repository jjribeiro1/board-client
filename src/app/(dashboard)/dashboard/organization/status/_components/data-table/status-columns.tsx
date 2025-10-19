import { ColumnDef } from "@tanstack/react-table";
import dayjs from "@/lib/dayjs";
import { Status } from "@/types/status";

type ColumnData = Status;

export const statusColumns: ColumnDef<ColumnData>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className={"h-4 w-4 rounded"} style={{ backgroundColor: row.original.color }}></div>
        <span>{row.original.color}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Criada em",
    cell: ({ row }) => <div>{dayjs(row.original.createdAt).format("DD/MM/YYYY")}</div>,
  },
];
