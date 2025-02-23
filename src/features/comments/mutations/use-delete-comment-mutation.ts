"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

export function useDeleteCommentMutation(commentId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.delete<void>(`/comments/${commentId}`);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      toast({
        variant: "default",
        description: "Comentário removido com sucesso",
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao remover comentário",
      });
    },
  });
}
