"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { UpdateTagInput } from "../schemas/update-tag-schema";

export function useUpdateTagMutation(tagId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: UpdateTagInput) => {
      const res = await apiClient.patch(`/tags/${tagId}`, data);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["organization-tags"] });
      queryClient.invalidateQueries({ queryKey: ["organization-posts"] });
      toast({
        variant: "default",
        description: "Tag atualizada com sucesso",
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao atualizar uma Tag",
      });
    },
  });
}
