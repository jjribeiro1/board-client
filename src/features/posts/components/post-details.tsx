"use client";
import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateComment } from "@/features/comments/components/create-comment";
import { Comment } from "@/features/comments/components/comment";
import { usePostInfo } from "../hooks/use-post-info";
import { usePostComments } from "../hooks/use-post-comments";

type Props = {
  postId: string;
};

export function PostDetails(props: Props) {
  const { data: post, isPending: postIsPending, error: postError } = usePostInfo(props.postId);
  const { data: comments, isPending: commentsIsPending, error: commentsError } = usePostComments(props.postId);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  function backToTop() {
    if (dialogRef.current) {
      dialogRef.current.scrollTo({
        top: 1,
        behavior: "smooth",
      });
    }
  }

  if (postIsPending || commentsIsPending) {
    return <div>carregando informações do post</div>;
  }

  if (postError || commentsError) {
    return <div>erro ao buscar dados</div>;
  }

  return (
    <DialogContent ref={dialogRef} className="max-h-[85dvh] max-w-5xl w-[1024px] overflow-y-scroll">
      <DialogHeader>
        <DialogTitle>{post.title}</DialogTitle>
        <DialogDescription>{post.description}</DialogDescription>
      </DialogHeader>
      <CreateComment postId={post.id} />
      <div className="flex flex-col gap-y-8">
        <p className="font-medium leading-6 underline underline-offset-8 decoration-1 decoration-gray-200">
          {`Comentários (${comments.length})`}
        </p>
        <div className="flex flex-col gap-y-10">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      <DialogFooter>
        <Button size={"icon"} variant={"ghost"} onClick={backToTop}>
          <ArrowUp />
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
