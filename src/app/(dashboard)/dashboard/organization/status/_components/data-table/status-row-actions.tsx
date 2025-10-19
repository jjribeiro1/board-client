"use client";
import { useState } from "react";
import { Ellipsis, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Status } from "@/types/status";
import { UpdateStatusDialog } from "../update-status";

type Props = {
  status: Status;
};

export function StatusRowActions(props: Props) {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <Ellipsis className="cursor-pointer" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setOpenUpdateDialog(true)} className="cursor-pointer">
            <Pencil />
            Atualizar Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateStatusDialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog} status={props.status} />
    </>
  );
}
