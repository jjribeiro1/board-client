import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

type BoardPostsResponse = {
  data: Array<{
    id: string;
    title: string;
    description: string;
    isPrivate: boolean;
    isPinned: boolean;
    isLocked: boolean;
    createdAt: string;
    author: {
      id: string;
      name: string;
    };
    status: {
      id: string;
      name: string;
      color: string;
      isSystemDefault: boolean;
    };
  }>;
};

export function useBoardPosts(boardId: string) {
  return useQuery({
    queryKey: ["board-posts", boardId],
    queryFn: async () => {
      const res = await apiClient.get<BoardPostsResponse>(`/boards/${boardId}/posts`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
