import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Organization } from "@/types/organization";

type OrganizationInfoResponse = {
  data: Organization;
};

export function useOrganizationInfo(organizationId: string) {
  return useQuery({
    queryKey: ["organization", organizationId],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationInfoResponse>(`organizations/${organizationId}`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
