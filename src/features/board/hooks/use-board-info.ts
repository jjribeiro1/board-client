import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Board } from "@/types/board";

type BoardInfoResponse = {
  data: Board;
};

export function useBoardInfo(boardId: string) {
  return useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => {
      const res = await apiClient.get<BoardInfoResponse>(`/boards/${boardId}`);
      return res.data.data;
    },
    enabled: !!boardId,
    staleTime: 1000 * 60 * 5,
  });
}
