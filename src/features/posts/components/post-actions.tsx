import { Link, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PinPost } from "./pin-post";
import { useDeletePostMutation } from "../mutations/use-delete-post-mutation";
import { Post } from "@/types/post";
import { ActionAlert } from "@/components/ui/alert";

type Props = {
  post: Post;
};

export function PostActions(props: Props) {
  const { mutate: deletePostMutation } = useDeletePostMutation(props.post.id);

  return (
    <div className="flex items-center gap-x-1">
      <PinPost post={props.post} />
      <Button size={"icon"} variant={"ghost"} className="h-7 w-7">
        <Link className="h-3 w-3" />
      </Button>
      <ActionAlert
        title="Você tem certeza?"
        description="Essa ação não pode ser desfeita e o post será removido completamente."
        cancelText="Cancelar"
        actionText="Confirmar"
        trigger={
          <Button size={"icon"} variant={"ghost"} className="h-7 w-7">
            <Trash className="h-3 w-3" />
          </Button>
        }
        onAction={deletePostMutation}
      />
    </div>
  );
}
