import { apiClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type PostsFromOrganization = {
  data: Array<{
    id: string;
    title: string;
    createdAt: string;
    board: {
      id: string;
      title: string;
    };
    status: {
      id: string;
      name: string;
      color: string;
      order: number;
    };
    tags: Array<{
      tag: {
        id: string;
        name: string;
        color: string;
      };
    }>;
  }>;
};

export function usePostsFromOrganization(orgId: string) {
  return useQuery({
    queryKey: ["posts-from-organization", orgId],
    queryFn: async () => {
      const res = await apiClient.get<PostsFromOrganization>(
        `/organizations/${orgId}/posts`
      );
      return res.data.data;
    },
  });
}
