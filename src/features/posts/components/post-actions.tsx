import { Link, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ActionAlert } from "@/components/ui/alert";
import { PinPost } from "./pin-post";
import { useDeletePostMutation } from "../mutations/use-delete-post-mutation";
import { Post } from "@/types/post";

type Props = {
  post: Post;
};

export function PostActions(props: Props) {
  const { mutate: deletePostMutation } = useDeletePostMutation(props.post.id);

  return (
    <div className="flex items-center gap-x-1">
      <PinPost post={props.post} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="h-7 w-7"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            >
              <Link className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copiar link do post</TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
