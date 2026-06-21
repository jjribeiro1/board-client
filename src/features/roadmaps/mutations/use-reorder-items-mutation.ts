"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import type { ReorderItemsInput } from "../schemas/reorder-items-schema";
import { getErrorMessage } from "@/lib/error-message";

export function useReorderItemsMutation(roadmapId: string, columnId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ReorderItemsInput) => {
      await apiClient.put(`/roadmap-columns/${columnId}/items/reorder`, data);
    },
    onSuccess() {
      toast({ variant: "default", description: "Itens reordenados com sucesso" });
      queryClient.invalidateQueries({ queryKey: ["roadmap", roadmapId] });
    },
    onError(err) {
      toast({ variant: "destructive", description: getErrorMessage(err) });
    },
  });
}
