import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/error-message";

export function useRetryInviteMutation(id: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post<string>(`/invites/${id}/retry`);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["organization-invites"] });

      toast({
        variant: "default",
        description: "Convite reenviado com sucesso",
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
