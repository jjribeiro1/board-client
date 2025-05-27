import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBoardPosts } from "../../hooks/use-board-posts";
import type { Board } from "@/types/board";
import dayjs from "@/lib/dayjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  board: Board;
};

export function Board(props: Props) {
  const router = useRouter();
  const { data: posts, isPending, error } = useBoardPosts(props.board.id);

  if (isPending) {
    return <div>carregando posts...</div>;
  }

  if (error) {
    return <div>Erro ao buscar posts</div>;
  }

  return (
    <section className="flex flex-col gap-y-10 container p-6 border-x">
      <div className="flex justify-between p-6 shadow-gray-700 shadow-md border transition-shadow">
        <div className="flex flex-col gap-y-2">
          <p className="text-2xl font-bold">{props.board.title}</p>
          <p className="text-sm font-medium text-muted-foreground">{props.board.description}</p>
        </div>

        <Button>Novo post</Button>
      </div>

      <div className="flex flex-col gap-y-8">
        {posts.map((post) => (
          <Card key={post.id} className="cursor-pointer border w-full" onClick={() => router.push(`/posts/${post.id}`)}>
            <CardHeader className="flex flex-row justify-between">
              <div className="flex flex-col gap-y-2">
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </div>

              <Badge className="h-max" variant={"secondary"}>{post.status.name}</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-x-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback>{post.author.name.at(0)}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-x-2">
                  <p>{post.author.name}</p>
                  <p className="text-muted-foreground">{`- ${dayjs(post.createdAt).fromNow()}`}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
