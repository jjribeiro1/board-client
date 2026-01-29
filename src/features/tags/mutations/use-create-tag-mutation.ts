"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { CreateTagInput } from "../schemas/create-tag-schema";
import { getErrorMessage } from "@/lib/error-message";

export function useCreateTagMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateTagInput) => {
      const res = await apiClient.post("/tags", data);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["organization-tags"] });
      toast({
        variant: "default",
        description: "Tag criada com sucesso",
      });
    },
    onError(err) {
      toast({
        variant: "destructive",
        description: getErrorMessage(err),
      });
    },
  });
}
