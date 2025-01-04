import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Board } from "@/types/board";

type OrganizationBoardsResponse = {
  data: Board[];
};

export function useOrganizationBoards(organizationId: string) {
  return useQuery({
    queryKey: ["organization-boards"],
    queryFn: async () => {
      const res = await apiClient.get<OrganizationBoardsResponse>(`/organizations/${organizationId}/boards`);
      return res.data.data;
    },
  });
}
