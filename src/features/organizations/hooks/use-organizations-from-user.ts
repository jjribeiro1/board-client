import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

type OrganizationsFromUser = {
  data: Array<{
    id: string;
    name: string;
    logoUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>;
};

export function useOrganizationsFromUser(userId: string | undefined) {
  return useQuery({
    queryKey: ["org-from-user", userId],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationsFromUser>(
        `/users/${userId}/organizations`
      );
      return res.data.data;
    },
    enabled: !!userId,
  });
}
