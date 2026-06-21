"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/error-message";

export function useDeleteColumnMutation(roadmapId: string, columnId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/roadmap-columns/${columnId}`);
    },
    onSuccess() {
      toast({ variant: "default", description: "Coluna removida com sucesso" });
      queryClient.invalidateQueries({ queryKey: ["roadmap", roadmapId] });
    },
    onError(err) {
      toast({ variant: "destructive", description: getErrorMessage(err) });
    },
  });
}
