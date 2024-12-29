import { apiClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type Organization = {
  data: {
    id: string;
    name: string;
    logoUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
};

export function useOrganizationInfo(organizationId: string) {
  return useQuery({
    queryKey: ["organization", organizationId],
    queryFn: async () => {
      const res = await apiClient.get<Organization>(
        `organizations/${organizationId}`
      );
      return res.data.data;
    },
  });
}
