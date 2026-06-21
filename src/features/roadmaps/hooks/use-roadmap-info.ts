import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { Roadmap } from "@/types/roadmap";

type RoadmapInfoResponse = {
  data: Roadmap;
};

export function useRoadmapInfo(roadmapId: string) {
  return useQuery({
    queryKey: ["roadmap", roadmapId],
    queryFn: async () => {
      const res = await apiClient.get<RoadmapInfoResponse>(`/roadmaps/${roadmapId}`);
      return res.data.data;
    },
    enabled: !!roadmapId,
    staleTime: 1000 * 60 * 5,
  });
}
