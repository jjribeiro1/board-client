"use client";
import { useState } from "react";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionAlert } from "@/components/ui/alert";
import { UpdateTagDialog } from "./update-tag";
import { useDeleteTagMutation } from "../mutations/use-delete-tag-mutation";
import { Tag } from "@/types/tag";

type Props = {
  tag: Tag;
};

export function TagActions(props: Props) {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const { mutate: deleteTagMutation } = useDeleteTagMutation(props.tag.id);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setOpenUpdateDialog(true)}>
            <Pencil />
            Atualizar Tag
          </DropdownMenuItem>

          <ActionAlert
            title="Excluir Tag"
            actionText="Excluir"
            cancelText="Cancelar"
            description="Tem certeza que deseja excluir esta tag? Esta ação não pode ser desfeita."
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Trash />
                Remover tag
              </DropdownMenuItem>
            }
            onAction={deleteTagMutation}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateTagDialog
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        tag={props.tag}
      />
    </>
  );
}
