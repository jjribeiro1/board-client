import { useState } from "react";
import { Pencil, CornerUpLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UpdateComment } from "./update-comment";
import { DeleteComment } from "./delete-comment";
import { useUserPermission } from "@/hooks/use-user-permission";
import type { Comment } from "@/types/comment";

type Props = {
  comment: Comment;
};

export function Comment(props: Props) {
  const [openUpdateComment, setOpenUpdateComment] = useState(false);
  const { isAdminOrOwnerFromOrg, loggedUser } = useUserPermission(props.comment.organizationId);

  function onCommentUpdate() {
    setOpenUpdateComment(false);
  }

  function cancelUpdateComment() {
    setOpenUpdateComment(false);
  }

  return (
    <div className="flex flex-col gap-y-2 border-b pb-4">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{props.comment.author.name.at(0)}</AvatarFallback>
          </Avatar>
          <span>{props.comment.author.name}</span>
        </div>

        {openUpdateComment ? (
          <Button onClick={cancelUpdateComment} className="h-6 w-6" variant={"ghost"} size={"icon"}>
            <CornerUpLeft className="h-3.5 w-3.5" />
          </Button>
        ) : isAdminOrOwnerFromOrg || props.comment.author.id === loggedUser?.id ? (
          <div className="flex items-center gap-x-2">
            <Button onClick={() => setOpenUpdateComment(true)} className="h-6 w-6" variant={"ghost"} size={"icon"}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <DeleteComment commentId={props.comment.id} />
          </div>
        ) : null}
      </div>
      {openUpdateComment ? (
        <UpdateComment comment={props.comment} onCommentUpdate={onCommentUpdate} />
      ) : (
        <p className="text-accent-foreground pl-2 text-sm">{props.comment.content}</p>
      )}
    </div>
  );
}
