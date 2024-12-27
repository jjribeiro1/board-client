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
        `/posts/organization`
      );
      return res.data.data;
    },
  });
}
