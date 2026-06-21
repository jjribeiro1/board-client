"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import type { CreateRoadmapColumnInput } from "../schemas/create-roadmap-column-schema";
import { getErrorMessage } from "@/lib/error-message";

export function useAddColumnMutation(roadmapId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoadmapColumnInput) => {
      const res = await apiClient.post(`/roadmaps/${roadmapId}/columns`, data);
      return res.data;
    },
    onSuccess() {
      toast({ variant: "default", description: "Coluna adicionada com sucesso" });
      queryClient.invalidateQueries({ queryKey: ["roadmap", roadmapId] });
    },
    onError(err) {
      toast({ variant: "destructive", description: getErrorMessage(err) });
    },
  });
}
