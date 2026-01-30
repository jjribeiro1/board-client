import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useQueryParams } from "@/hooks/use-query-params";
import { OrganizationPostsData } from "@/types/organization-posts";

type OrganizationPostsResponse = {
  data: Array<OrganizationPostsData>;
};

type Props = {
  orgId: string;
};

export function useOrganizationPosts(props: Props) {
  const { createQueryString } = useQueryParams();
  const queryString = createQueryString();

  return useQuery({
    queryKey: ["organization-posts", props.orgId, queryString],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationPostsResponse>(`/organizations/${props.orgId}/posts${queryString}`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
