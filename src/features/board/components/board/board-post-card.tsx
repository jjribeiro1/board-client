import { useRouter } from "next/navigation";
import { MessageCircleMore, Pin, ChevronUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BoardPostData } from "../../hooks/use-board-posts";
import { useTogglePostVoteMutation } from "@/features/posts/mutations/use-toggle-post-vote-mutation";
import dayjs from "@/lib/dayjs";

type Props = {
  post: BoardPostData;
};

export function BoardPostCard(props: Props) {
  const router = useRouter();

  const { mutate: togglePostVoteMutation, isPending } = useTogglePostVoteMutation(props.post.id);

  return (
    <Card key={props.post.id} className="w-full cursor-pointer border">
      <CardHeader onClick={() => router.push(`/posts/${props.post.id}`)}>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-3">
            {props.post.isPinned && <Pin className="size-4 text-amber-300" />}

            <CardTitle>{props.post.title}</CardTitle>
            <Badge className="h-max" variant={"secondary"}>
              {props.post.status.name}
            </Badge>

            {props.post.isPinned && <Badge className="h-max bg-amber-300 hover:bg-amber-300">Fixado</Badge>}
          </div>

          <CardDescription>{props.post.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback>{props.post.author.name.at(0)}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-x-2">
            <p>{props.post.author.name}</p>
            <p className="text-muted-foreground">{`- ${dayjs(props.post.createdAt).fromNow()}`}</p>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <Button
            type="button"
            size="sm"
            variant={props.post.userHasVoted ? "default" : "ghost"}
            disabled={isPending}
            onClick={() => togglePostVoteMutation()}
          >
            <ChevronUp className="size-4" />
            <span className="text-sm">{props.post._count.votes}</span>
          </Button>

          <div className="flex items-center gap-x-2">
            <MessageCircleMore className="size-4" />
            <span className="text-sm">{props.post._count.comments}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
