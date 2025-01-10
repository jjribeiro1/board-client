"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { CreatePostInput } from "../schemas/create-post-schema";

export function useCreatePostMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostInput) => {
      const res = await apiClient.post<string>("/posts", data);
      return res.data;
    },
    onSuccess() {
      toast({
        variant: "default",
        description: "Post criado com sucesso",
      });
      queryClient.refetchQueries({ queryKey: ["organization-posts"] });
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao criar um novo post",
      });
    },
  });
}
