import { Link, Trash, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ActionAlert } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
            <Button size={"icon"} variant={"ghost"} onClick={() => navigator.clipboard.writeText(window.location.href)}>
              <Link className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copiar link do post</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <Ellipsis className="text-muted-foreground h-3 w-3 cursor-pointer" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <ActionAlert
              title="Você tem certeza?"
              description="Essa ação não pode ser desfeita e o post será removido completamente."
              cancelText="Cancelar"
              actionText="Confirmar"
              trigger={
                <Button size={"icon"} variant={"ghost"} className="flex w-full items-center">
                  <Trash />
                  Remover post
                </Button>
              }
              onAction={deletePostMutation}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
