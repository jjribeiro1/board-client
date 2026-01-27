import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Invite } from "@/types/invite";

type OrganizationInvitesResponse = {
  data: Array<Invite>;
};

export function useOrganizationInvites(organizationId: string) {
  return useQuery({
    queryKey: ["organization-invites", organizationId],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationInvitesResponse>(`organizations/${organizationId}/invites`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
