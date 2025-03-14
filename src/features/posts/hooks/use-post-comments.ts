import { apiClient } from "@/lib/axios";
import { Comment } from "@/types/comment";
import { useQuery } from "@tanstack/react-query";

type PostCommentsResponse = {
  data: Comment[];
};

export function usePostComments(postId: string) {
  return useQuery({
    queryKey: ["post-comments", postId],
    queryFn: async () => {
      const res = await apiClient.get<PostCommentsResponse>(`/posts/${postId}/comments`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
