import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionAlert } from "@/components/ui/alert";
import { useDeleteCommentMutation } from "../mutations/use-delete-comment-mutation";

type Props = {
  commentId: string;
};

export function DeleteComment(props: Props) {
  const { mutate: deleteCommentMutation } = useDeleteCommentMutation(props.commentId);

  return (
    <ActionAlert
      title="Você tem certeza?"
      description="O comentário será removido e essa ação não pode ser desfeita"
      cancelText="Cancelar"
      actionText="Confirmar"
      trigger={
        <Button className="h-6 w-6" variant={"ghost"} size={"icon"}>
          <Trash className="h-3.5 w-3.5" />
        </Button>
      }
      onAction={deleteCommentMutation}
    />
  );
}
