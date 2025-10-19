"use client";
import { useState } from "react";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ActionAlert } from "@/components/ui/alert";
import { UpdateStatusDialog } from "../update-status";
import { useDeleteStatusMutation } from "@/features/status/mutations/use-delete-status-mutation";
import { Status } from "@/types/status";

type Props = {
  status: Status;
};

export function StatusRowActions(props: Props) {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const { mutate: deleteStatusMutation } = useDeleteStatusMutation(props.status.id);

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

          <ActionAlert
            title="Excluir Status"
            actionText="Excluir"
            cancelText="Cancelar"
            description="Tem certeza que deseja excluir esse status? Esta ação não pode ser desfeita."
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                <Trash />
                Remover status
              </DropdownMenuItem>
            }
            onAction={deleteStatusMutation}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateStatusDialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog} status={props.status} />
    </>
  );
}
