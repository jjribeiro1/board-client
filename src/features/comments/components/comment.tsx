import { useState } from "react";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UpdateComment } from "./update-comment";
import { DeleteComment } from "./delete-comment";
import type { Comment } from "@/types/comment";

type Props = {
  comment: Comment;
};

export function Comment(props: Props) {
  const [openUpdateComment, setOpenUpdateComment] = useState(false);

  function onCommentUpdate() {
    setOpenUpdateComment(false);
  }

  return (
    <div className="flex flex-col gap-y-2 border-b pb-4">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{props.comment.authorName.at(0)}</AvatarFallback>
          </Avatar>
          <span>{props.comment.authorName}</span>
        </div>

        <div className="flex items-center gap-x-2">
          <Button onClick={() => setOpenUpdateComment(true)} className="h-6 w-6" variant={"ghost"} size={"icon"}>
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <DeleteComment commentId={props.comment.id} />
        </div>
      </div>
      {openUpdateComment ? (
        <UpdateComment comment={props.comment} onCommentUpdate={onCommentUpdate} />
      ) : (
        <p className="pl-2 text-sm text-accent-foreground">{props.comment.content}</p>
      )}
    </div>
  );
}
