"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/error-message";

export function useDeleteRoadmapMutation(roadmapId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/roadmaps/${roadmapId}`);
    },
    onSuccess() {
      toast({ variant: "default", description: "Roadmap removido com sucesso" });
      queryClient.invalidateQueries({ queryKey: ["organization-roadmaps"] });
    },
    onError(err) {
      toast({ variant: "destructive", description: getErrorMessage(err) });
    },
  });
}
