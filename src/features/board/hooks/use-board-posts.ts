import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useQueryParams } from "@/hooks/use-query-params";

export type BoardPostData = {
  id: string;
  title: string;
  isLocked: boolean;
  isPinned: boolean;
  isPrivate: boolean;
  description: string;
  userHasVoted: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
  status: {
    id: string;
    name: string;
    color: string;
  };
  _count: {
    comments: number;
    votes: number;
  };
};

type BoardPostsResponse = {
  data: Array<BoardPostData>;
};

export function useBoardPosts(boardId: string) {
  const { createQueryString } = useQueryParams();
  const queryString = createQueryString();

  return useQuery({
    queryKey: ["board-posts", boardId, queryString],
    queryFn: async () => {
      const res = await apiClient.get<BoardPostsResponse>(`/boards/${boardId}/posts${queryString}`);
      return res.data.data;
    },
    enabled: !!boardId,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
