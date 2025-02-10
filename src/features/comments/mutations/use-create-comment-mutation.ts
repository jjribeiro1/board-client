"use client";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { CreateCommentInput } from "../schemas/create-comment-schema";

export function useCreateCommentMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateCommentInput) => {
      const res = await apiClient.post<string>("/comments", data);
      return res.data;
    },
    onSuccess() {
      toast({
        variant: "default",
        description: "Comentário criado com sucesso",
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao criar um novo comentário",
      });
    },
  });
}
