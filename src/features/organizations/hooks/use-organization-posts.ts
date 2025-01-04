import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Status } from "@/types/status";
import { Board } from "@/types/board";
import { Post } from "@/types/post";

interface Data extends Post {
  board: Board;
  status: Status;
  tags: Array<{
    tag: {
      id: string;
      name: string;
      color: string;
    };
  }>;
}

type OrganizationPostsResponse = {
  data: Array<Data>;
};

export function useOrganizationPosts(orgId: string) {
  return useQuery({
    queryKey: ["organization-posts", orgId],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationPostsResponse>(`/organizations/${orgId}/posts`);
      return res.data.data;
    },
  });
}
