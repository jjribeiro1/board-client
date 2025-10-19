import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

export function useDeleteStatusMutation(statusId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.delete(`/status/${statusId}`);
      return res.data;
    },
    onSuccess() {
      toast({
        variant: "default",
        description: "Status excluído com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["organization-status"] });
    },
    onError(err) {
      const error = err as AxiosError;
      const response = error.response?.data as { message: string } | undefined;
      const message = response?.message;

      toast({
        variant: "destructive",
        description: message || "Erro inesperado ao excluir o status",
      });
    },
  });
}
