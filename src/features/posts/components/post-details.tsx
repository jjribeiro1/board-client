"use client";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePostInfo } from "../hooks/use-post-info";
import { usePostComments } from "../hooks/use-post-comments";

type Props = {
  postId: string;
};

export function PostDetails(props: Props) {
  const { data: post, isPending: postIsPending, error: postError } = usePostInfo(props.postId);
  const { data: comments, isPending: commentsIsPending, error: commentsError } = usePostComments(props.postId);

  if (postIsPending || commentsIsPending) {
    return <div>carregando informações do post</div>;
  }

  if (postError || commentsError) {
    return <div>erro ao buscar dados</div>;
  }

  return (
    <DialogContent className="max-w-5xl w-[1024px]">
      <DialogHeader>
        <DialogTitle>{post.title}</DialogTitle>
        <DialogDescription>{post.description}</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-y-8">
        <p className="font-medium leading-6 underline underline-offset-8 decoration-1 decoration-gray-200">
          {`Comentários (${comments.length})`}
        </p>
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{comment.authorName.at(0)}</AvatarFallback>
                </Avatar>
                <span>{comment.authorName}</span>
              </div>
              <p className="pl-2">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
      <DialogFooter>Footer</DialogFooter>
    </DialogContent>
  );
}
