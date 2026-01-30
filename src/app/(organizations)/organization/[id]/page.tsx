"use client";

import { useBoardInfo } from "@/features/board/hooks/use-board-info";
import { useQueryParams } from "@/hooks/use-query-params";
import { useBoardPosts } from "@/features/board/hooks/use-board-posts";
import { BoardPostCard } from "@/features/board/components/board/board-post-card";

export default function PublicOrganizationPage() {
  const { getQueryParam } = useQueryParams();

  const statusId = getQueryParam("status") || "";
  const boardId = getQueryParam("board");

  const { data: boardData, isPending: boardDataPending, error: boardsDataError } = useBoardInfo(boardId!);
  const {
    data: posts,
    isPending: postsPending,
    error: postsError,
  } = useBoardPosts(boardData?.id!, { filters: { status: statusId } });

  if (boardDataPending || postsPending) {
    return <div>Carregando informações...</div>;
  }

  if (boardsDataError || postsError) {
    return <div>Erro ao buscar dados do canal</div>;
  }

  return (
    <section className="flex flex-col gap-y-10 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{boardData.title}</h1>
        <p className="text-secondary-foreground text-lg">{boardData.description}</p>
      </div>

      <div className="flex flex-col gap-y-8">
        {posts.map((post) => (
          <BoardPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
