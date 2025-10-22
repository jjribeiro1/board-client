"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { CreatePostInput } from "../schemas/create-post-schema";
import { AxiosError } from "axios";

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
      queryClient.invalidateQueries({ queryKey: ["organization-posts"] });
      queryClient.invalidateQueries({ queryKey: ["board-posts"] });
    },
    onError(err) {
      const error = err as AxiosError;
      const response = error.response?.data as { message: string } | undefined;
      const message = response?.message;

      toast({
        variant: "destructive",
        description: message || "Erro inesperado ao criar um novo post",
      });
    },
  });
}
