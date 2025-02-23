"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { UpdateCommentInput } from "../schemas/update-comment-schema";

export function useUpdateCommentMutation(commentId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: UpdateCommentInput) => {
      const res = await apiClient.patch<string>(`/comments/${commentId}`, data);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      toast({
        variant: "default",
        description: "Comentário editado com sucesso",
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao editar comentário",
      });
    },
  });
}
