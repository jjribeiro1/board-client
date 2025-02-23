import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Comment } from "@/types/comment";
import { DeleteComment } from "./delete-comment";

type Props = {
  comment: Comment;
};

export function Comment(props: Props) {
  return (
    <div className="flex flex-col gap-y-2 border-b pb-4">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{props.comment.authorName.at(0)}</AvatarFallback>
          </Avatar>
          <span>{props.comment.authorName}</span>
        </div>

        <DeleteComment commentId={props.comment.id} />
      </div>
      <p className="pl-2 text-sm text-accent-foreground">{props.comment.content}</p>
    </div>
  );
}
