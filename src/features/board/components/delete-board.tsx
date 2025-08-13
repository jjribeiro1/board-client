import { Trash } from "lucide-react";
import { ActionAlert } from "@/components/ui/alert";
import { useDeleteBoardMutation } from "../mutations/use-delete-board-mutation";

type Props = {
  boardId: string;
};

export function DeleteBoard(props: Props) {
  const { mutate: deleteBoardMutation } = useDeleteBoardMutation(props.boardId);

  return (
    <ActionAlert
      title="Você tem certeza?"
      description="O board será removido e todos os dados associados serão perdidos"
      cancelText="Cancelar"
      actionText="Confirmar"
      trigger={
        <div className="hover:bg-secondary focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
          <Trash />
          Remover board
        </div>
      }
      onAction={deleteBoardMutation}
    />
  );
}
