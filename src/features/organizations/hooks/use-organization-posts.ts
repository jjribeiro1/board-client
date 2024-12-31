import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

type OrganizationPostsResponse = {
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

export function useOrganizationPosts(orgId: string) {
  return useQuery({
    queryKey: ["organization-posts", orgId],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationPostsResponse>(
        `/organizations/${orgId}/posts`
      );
      return res.data.data;
    },
  });
}
