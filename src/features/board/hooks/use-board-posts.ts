import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

export type BoardPostData = {
  id: string;
  title: string;
  isLocked: boolean;
  isPinned: boolean;
  isPrivate: boolean;
  description: string;
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
  };
};

type BoardPostsResponse = {
  data: Array<BoardPostData>;
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
