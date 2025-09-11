import { apiClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type OrganizationTagsResponse = {
  data: Array<{
    id: string;
    name: string;
    color: string;
    isSystemDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    organizationId: string | null;
  }>;
};

export function useOrganizationTags(organizationId: string) {
  return useQuery({
    queryKey: ["organization-tags", organizationId],
    queryFn: async () => {
      const response = await apiClient.get<OrganizationTagsResponse>(`/organizations/${organizationId}/tags`);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
