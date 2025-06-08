import { Link, Trash, Ellipsis, Pencil } from "lucide-react";
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
  setEditPostIsEnabled: (value: boolean) => void;
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
          <DropdownMenuItem className="cursor-pointer" onClick={() => props.setEditPostIsEnabled(true)}>
            <Pencil />
            Editar título/descrição
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <ActionAlert
              title="Você tem certeza?"
              description="Essa ação não pode ser desfeita e o post será removido completamente."
              cancelText="Cancelar"
              actionText="Confirmar"
              trigger={
                <div className="hover:bg-secondary focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
                  <Trash />
                  Remover post
                </div>
              }
              onAction={deletePostMutation}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
