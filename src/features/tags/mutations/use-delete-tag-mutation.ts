"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

export function useDeleteTagMutation(tagId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.delete(`/tags/${tagId}`);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["organization-tags"] });
      toast({
        variant: "default",
        description: "Tag removida com sucesso",
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao remover Tag",
      });
    },
  });
}
