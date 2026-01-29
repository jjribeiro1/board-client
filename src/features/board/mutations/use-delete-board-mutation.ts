"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error-message";

export function useDeleteBoardMutation(boardId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/boards/${boardId}`);
    },
    onSuccess() {
      toast({
        variant: "default",
        description: "Canal removido com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["organization-boards"] });
    },
    onError(err) {
      toast({
        variant: "destructive",
        description: getErrorMessage(err),
      });
    },
  });
}
