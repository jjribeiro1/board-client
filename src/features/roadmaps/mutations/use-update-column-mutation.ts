"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import type { UpdateRoadmapColumnInput } from "../schemas/update-roadmap-column-schema";
import { getErrorMessage } from "@/lib/error-message";

export function useUpdateColumnMutation(roadmapId: string, columnId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateRoadmapColumnInput) => {
      const res = await apiClient.patch(`/roadmap-columns/${columnId}`, data);
      return res.data;
    },
    onSuccess() {
      toast({ variant: "default", description: "Coluna atualizada com sucesso" });
      queryClient.invalidateQueries({ queryKey: ["roadmap", roadmapId] });
    },
    onError(err) {
      toast({ variant: "destructive", description: getErrorMessage(err) });
    },
  });
}
