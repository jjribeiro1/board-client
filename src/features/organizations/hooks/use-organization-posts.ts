import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useQueryParams } from "@/hooks/use-query-params";
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
  _count: {
    comments: number;
  };
}

type OrganizationPostsResponse = {
  data: Array<Data>;
};

type Props = {
  orgId: string;
  filters: {
    status: string;
    board: string;
  };
};

export function useOrganizationPosts(props: Props) {
  const { createQueryString } = useQueryParams();
  const queryString = createQueryString();

  return useQuery({
    queryKey: ["organization-posts", props.orgId, props.filters],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationPostsResponse>(`/organizations/${props.orgId}/posts${queryString}`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
