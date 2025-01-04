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

type Props = {
  orgId: string;
  filters: {
    status: string;
  };
};

export function useOrganizationPosts(props: Props) {
  const queryString = props.filters.status ? `?status=${props.filters.status}` : "";
  return useQuery({
    queryKey: ["organization-posts", props.orgId, props.filters.status],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationPostsResponse>(`/organizations/${props.orgId}/posts${queryString}`);
      return res.data.data;
    },
  });
}
