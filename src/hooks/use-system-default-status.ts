import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Status } from "@/types/status";

type SystemDefaultStatusResponse = {
  data: Array<Status>;
};

export function useSystemDefaultStatus() {
  return useQuery({
    queryKey: ["system-default-status"],
    queryFn: async () => {
      const res = await apiClient.get<SystemDefaultStatusResponse>("/status?fromOrg=0");
      return res.data.data;
    },
  });
}
