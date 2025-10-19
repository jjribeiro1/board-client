import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { UpdateStatusInput } from "../schemas/update-status-schema";

export function useUpdateStatusMutation(statusId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateStatusInput) => {
      const res = await apiClient.patch(`/status/${statusId}`, data);
      return res.data;
    },
    onSuccess() {
      toast({
        variant: "default",
        description: "Status atualizado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["organization-status"] });
    },
    onError(err) {
      const error = err as AxiosError;
      const response = error.response?.data as { message: string } | undefined;
      const message = response?.message;

      toast({
        variant: "destructive",
        description: message || "Erro inesperado ao atualizar o status",
      });
    },
  });
}
