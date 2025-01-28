import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Post } from "@/types/post";

type PostInfoResponse = {
  data: Post;
};

export function usePostInfo(postId: string) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await apiClient.get<PostInfoResponse>(`posts/${postId}`);
      return res.data.data;
    },
  });
}
