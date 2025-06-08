"use client";
import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PostStatusDropdown } from "./post-status-dropdown";
import { PostActions } from "./post-actions";
import { UpdatePost } from "./update-post";
import { CreateComment } from "@/features/comments/components/create-comment";
import { Comment } from "@/features/comments/components/comment";
import { usePostInfo } from "../hooks/use-post-info";
import { usePostComments } from "../hooks/use-post-comments";
import dayjs from "@/lib/dayjs";

type Props = {
  postId: string;
  orgId: string;
};

export function PostDetails(props: Props) {
  const [editPostIsEnabled, setEditPostIsEnabled] = useState(false);
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
    <DialogContent
      withCloseButton={false}
      ref={dialogRef}
      className="flex max-h-[90dvh] w-[1152px] max-w-6xl gap-0 overflow-y-scroll p-0"
    >
      <section className="h-full w-[70%] space-y-8 border-r p-6">
        {editPostIsEnabled ? (
          <UpdatePost post={post} onPostUpdate={() => setEditPostIsEnabled(false)} />
        ) : (
          <div>
            <DialogTitle>{post.title}</DialogTitle>
            <DialogDescription>{post.description}</DialogDescription>
          </div>
        )}

        <CreateComment postId={post.id} />

        <Separator className="my-4" />

        <div className="flex flex-col gap-y-8">
          <p className="leading-6 font-medium underline decoration-gray-200 decoration-1 underline-offset-8">
            {`Comentários (${comments.length})`}
          </p>
          <div className="flex flex-col gap-y-10">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>

        <div className="justify-self-end">
          <Button size={"icon"} variant={"ghost"} onClick={backToTop}>
            <ArrowUp />
          </Button>
        </div>
      </section>

      <section className="w-[30%]">
        <div className="flex items-center justify-between px-4 pt-4">
          <p className="text-muted-foreground text-sm font-semibold tracking-wide">Gerenciar post</p>
          <PostActions post={post} setEditPostIsEnabled={setEditPostIsEnabled} />
        </div>
        <Separator className="my-4 mb-6" />

        <div className="flex flex-col gap-y-6 px-4">
          <div className="flex items-center justify-between">
            <p>Status</p>
            <PostStatusDropdown post={post} orgId={props.orgId} />
          </div>

          <div className="flex items-center justify-between">
            <p>Criado por</p>
            <div className="flex items-center gap-x-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback>{post?.author?.name.at(0)}</AvatarFallback>
              </Avatar>
              <p className="text-muted-foreground text-sm">{post?.author?.name}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p>Data</p>
            <p className="text-muted-foreground text-sm">{`${dayjs(post.createdAt).fromNow()}`}</p>
          </div>
        </div>
      </section>
    </DialogContent>
  );
}
