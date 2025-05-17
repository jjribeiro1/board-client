import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBoardPosts } from "../../hooks/use-board-posts";
import type { Board } from "@/types/board";
import dayjs from "@/lib/dayjs";

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
    <section className="flex flex-col gap-y-6 p-6 w-[768px] bg-card text-card-foreground border">
      <div className="flex flex-col gap-y-1">
        <p className="text-2xl font-semibold leading-none tracking-tight">{props.board.title}</p>
        <p className="text-sm text-muted-foreground">{props.board.description}</p>
      </div>
      <div className="flex flex-col gap-y-8 p-6">
        {posts.map((post) => (
          <Card key={post.id} className="cursor-pointer" onClick={() => router.push(`/posts/${post.id}`)}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
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
