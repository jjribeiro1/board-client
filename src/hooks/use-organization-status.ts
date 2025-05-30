import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Status } from "@/types/status";

type SystemDefaultStatusResponse = {
  data: Array<Status>;
};

export function useOrganizationStatus() {
  return useQuery({
    queryKey: ["organization-status"],
    queryFn: async () => {
      const res = await apiClient.get<SystemDefaultStatusResponse>("/status");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
