import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { CreateStatusInput } from "../schemas/create-status-schema";
import { getErrorMessage } from "@/lib/error-message";

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
      toast({
        variant: "destructive",
        description: getErrorMessage(err),
      });
    },
  });
}
