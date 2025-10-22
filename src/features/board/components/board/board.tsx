import { BoardPostCard } from "./board-post-card";
import { useBoardPosts } from "../../hooks/use-board-posts";
import { CreatePost } from "@/features/posts/components/create-post";
import type { Board } from "@/types/board";

type Props = {
  board: Board;
};

export function Board(props: Props) {
  const { data: posts, isPending, error } = useBoardPosts(props.board.id);

  if (isPending) {
    return <div>carregando posts...</div>;
  }

  if (error) {
    return <div>Erro ao buscar posts</div>;
  }

  return (
    <section className="container flex flex-col gap-y-10 border-x p-6">
      <div className="flex justify-between border p-6 shadow-md shadow-gray-700 transition-shadow">
        <div className="flex flex-col gap-y-2">
          <p className="text-2xl font-bold">{props.board.title}</p>
          <p className="text-muted-foreground text-sm font-medium">{props.board.description}</p>
        </div>

        <CreatePost organizationId={props.board.organizationId} boardId={props.board.id} />
      </div>

      <div className="flex flex-col gap-y-8">
        {posts.map((post) => (
          <BoardPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
