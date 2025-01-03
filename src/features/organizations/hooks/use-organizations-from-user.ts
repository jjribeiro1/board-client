import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Organization } from "@/types/organization";

type OrganizationsFromUserResponse = {
  data: Array<Organization>;
};

export function useOrganizationsFromUser(userId: string | undefined) {
  return useQuery({
    queryKey: ["org-from-user", userId],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationsFromUserResponse>(
        `/users/${userId}/organizations`
      );
      return res.data.data;
    },
    enabled: !!userId,
  });
}
