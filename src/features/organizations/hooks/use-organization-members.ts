import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

type OrganizationMembersResponse = {
  data: Array<{
    id: string;
    name: string;
    email: string;
    role: "OWNER" | "ADMIN" | "MEMBER";
    createdAt: Date;
  }>;
};

export function useOrganizationMembers(organizationId: string) {
  return useQuery({
    queryKey: ["organization-members", organizationId],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationMembersResponse>(`organizations/${organizationId}/members`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
