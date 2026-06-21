"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import type { UpdateRoadmapInput } from "../schemas/update-roadmap-schema";
import { getErrorMessage } from "@/lib/error-message";

export function useUpdateRoadmapMutation(roadmapId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateRoadmapInput) => {
      const res = await apiClient.patch(`/roadmaps/${roadmapId}`, data);
      return res.data;
    },
    onSuccess() {
      toast({ variant: "default", description: "Roadmap atualizado com sucesso" });
      queryClient.invalidateQueries({ queryKey: ["roadmap", roadmapId] });
      queryClient.invalidateQueries({ queryKey: ["organization-roadmaps"] });
    },
    onError(err) {
      toast({ variant: "destructive", description: getErrorMessage(err) });
    },
  });
}
