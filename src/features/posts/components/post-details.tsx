"use client";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePostInfo } from "../hooks/use-post-info";

type Props = {
  postId: string;
};

export function PostDetails(props: Props) {
  const { data, isPending, error } = usePostInfo(props.postId);

  if (isPending) {
    return <div>carregando informações do post</div>;
  }

  if (error) {
    return <div>erro ao buscar dados</div>;
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{data.title}</DialogTitle>
      </DialogHeader>
      <div>{data.description}</div>
      <DialogFooter>Footer</DialogFooter>
    </DialogContent>
  );
}
