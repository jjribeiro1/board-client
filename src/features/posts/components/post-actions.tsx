import { Link, Ellipsis, Pencil, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PinPost } from "./pin-post";
import { PostCommentsLock } from "./posts-comments-lock";
import { DeletePost } from "./delete-post";
import { Post } from "@/types/post";

type Props = {
  post: Post;
  setEditPostIsEnabled: (value: boolean) => void;
  setEditPostTagsEnabled: (value: boolean) => void;
};

export function PostActions(props: Props) {
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

          <DropdownMenuItem className="cursor-pointer" onClick={() => props.setEditPostTagsEnabled(true)}>
            <Tag />
            Editar tags
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <PostCommentsLock post={props.post} />
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <DeletePost post={props.post} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
