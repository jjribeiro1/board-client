import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { Roadmap } from "@/types/roadmap";

type OrganizationRoadmapsResponse = {
  data: Roadmap[];
};

export function useOrganizationRoadmaps(organizationId: string) {
  return useQuery({
    queryKey: ["organization-roadmaps", organizationId],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationRoadmapsResponse>(
        `/organizations/${organizationId}/roadmap`,
      );
      return res.data.data;
    },
    enabled: !!organizationId,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
