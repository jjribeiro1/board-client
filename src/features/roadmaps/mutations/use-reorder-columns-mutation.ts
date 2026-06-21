"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import type { ReorderColumnsInput } from "../schemas/reorder-columns-schema";
import { getErrorMessage } from "@/lib/error-message";

export function useReorderColumnsMutation(roadmapId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ReorderColumnsInput) => {
      await apiClient.put("/roadmap-columns/reorder", data);
    },
    onSuccess() {
      toast({ variant: "default", description: "Colunas reordenadas com sucesso" });
      queryClient.invalidateQueries({ queryKey: ["roadmap", roadmapId] });
    },
    onError(err) {
      toast({ variant: "destructive", description: getErrorMessage(err) });
    },
  });
}
