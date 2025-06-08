import { Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useUpdatePostMutation } from "../mutations/use-update-post-mutation";
import { Post } from "@/types/post";

type Props = {
  post: Post;
};

export function PinPost(props: Props) {
  const { mutate: updatePostMutation } = useUpdatePostMutation(props.post.id);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => updatePostMutation({ isPinned: props.post.isPinned ? false : true })}
            size={"icon"}
            variant={"ghost"}
            className={`${props.post.isPinned ? "text-yellow-500 hover:text-yellow-500" : ""}`}
          >
            <Pin className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {props.post.isPinned ? "Remover destaque do post" : "Fixar post no topo do seu feed"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
