import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteCommentMutation } from "../mutations/use-delete-comment-mutation";

type Props = {
  commentId: string;
};

export function DeleteComment(props: Props) {
  const { mutate } = useDeleteCommentMutation(props.commentId);

  function onClick() {
    mutate();
  }

  return (
    <Button onClick={onClick} className="h-6 w-6" variant={"ghost"} size={"icon"}>
      <Trash className="w-3.5 h-3.5" />
    </Button>
  );
}
