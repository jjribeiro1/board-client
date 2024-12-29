import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

type SystemDefaultStatus = {
  data: Array<{
    id: string;
    name: string;
    color: string;
    isSystemDefault: boolean;
    order: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    organizationId: string | null;
  }>;
};

export function useSystemDefaultStatus() {
  return useQuery({
    queryKey: ["system-default-status"],
    queryFn: async () => {
      const res = await apiClient.get<SystemDefaultStatus>("/status?fromOrg=0");
      return res.data.data;
    },
  });
}
