"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/axios";

type MutationFnProps = {
  title: string;
  description: string;
  organizationId: string;
};

export function useCreateBoardMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: MutationFnProps) => {
      await apiClient.post("/boards", data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["organization-boards"] });
      toast({
        variant: "default",
        description: "Board criado com sucesso",
      });
    },
    onError() {
      toast({
        description: "Erro inesperado ao remover board",
        variant: "destructive",
      });
    },
  });
}
