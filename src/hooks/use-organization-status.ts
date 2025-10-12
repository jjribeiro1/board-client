import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Status } from "@/types/status";

type StatusFromOrgResponse = {
  data: Array<Status>;
};

export function useOrganizationStatus(organizationId: string) {
  return useQuery({
    queryKey: ["organization-status", organizationId],
    queryFn: async () => {
      const res = await apiClient.get<StatusFromOrgResponse>(`/organizations/${organizationId}/status`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
