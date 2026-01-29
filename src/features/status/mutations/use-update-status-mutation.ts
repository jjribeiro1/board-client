import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { UpdateStatusInput } from "../schemas/update-status-schema";
import { getErrorMessage } from "@/lib/error-message";

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
      toast({
        variant: "destructive",
        description: getErrorMessage(err),
      });
    },
  });
}
