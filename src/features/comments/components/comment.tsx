import { useState } from "react";
import { Pencil, CornerUpLeft, Reply } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UpdateComment } from "./update-comment";
import { DeleteComment } from "./delete-comment";
import { CreateComment } from "./create-comment";
import { useUserPermission } from "@/hooks/use-user-permission";
import type { Comment as CommentType } from "@/types/comment";
import type { Post } from "@/types/post";

type Props = {
  comment: CommentType;
  post: Post;
  isReply?: boolean;
};

export function Comment(props: Props) {
  const [openUpdateComment, setOpenUpdateComment] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { isAdminOrOwnerFromOrg, loggedUser } = useUserPermission(props.comment.organizationId);

  const canReply = !props.isReply && !props.post.isLocked;
  const canEditOrDelete = isAdminOrOwnerFromOrg || props.comment.author.id === loggedUser?.id;

  function onCommentUpdate() {
    setOpenUpdateComment(false);
  }

  function cancelUpdateComment() {
    setOpenUpdateComment(false);
  }

  function handleReplySuccess() {
    setShowReplyForm(false);
  }

  return (
    <div className={`flex flex-col gap-y-2 ${props.isReply ? "ml-8 border-l-2 pl-4" : "border-b pb-4"}`}>
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
        ) : canEditOrDelete ? (
          <div className="flex items-center gap-x-2">
            {canReply && (
              <Button onClick={() => setShowReplyForm(true)} className="h-6 w-6" variant={"ghost"} size={"icon"}>
                <Reply className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button onClick={() => setOpenUpdateComment(true)} className="h-6 w-6" variant={"ghost"} size={"icon"}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <DeleteComment commentId={props.comment.id} postId={props.comment.postId} />
          </div>
        ) : canReply ? (
          <Button onClick={() => setShowReplyForm(true)} className="h-6 w-6" variant={"ghost"} size={"icon"}>
            <Reply className="h-3.5 w-3.5" />
          </Button>
        ) : null}
      </div>
      {openUpdateComment ? (
        <UpdateComment comment={props.comment} onCommentUpdate={onCommentUpdate} />
      ) : (
        <p className="text-accent-foreground pl-2 text-sm">{props.comment.content}</p>
      )}

      {showReplyForm && (
        <div className="mt-2">
          <CreateComment
            post={props.post}
            parentId={props.comment.id}
            onSuccess={handleReplySuccess}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {props.comment?.replies?.length > 0 && (
        <div className="mt-4 flex flex-col gap-y-4">
          {props.comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} post={props.post} isReply />
          ))}
        </div>
      )}
    </div>
  );
}
