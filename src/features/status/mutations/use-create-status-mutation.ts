import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { CreateStatusInput } from "../schemas/create-status-schema";

export function useCreateStatusMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateStatusInput) => {
      const res = await apiClient.post("/status", data);
      return res.data;
    },
    onSuccess() {
      toast({
        variant: "default",
        description: "Status criado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["organization-status"] });
    },
    onError(err) {
      const error = err as AxiosError;
      const response = error.response?.data as { message: string } | undefined;
      const message = response?.message;

      toast({
        variant: "destructive",
        description: message || "Erro inesperado ao criar um novo status",
      });
    },
  });
}
