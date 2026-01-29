import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/error-message";

export function useAcceptInviteMutation(token: string) {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post<string>(`/invites/${token}/accept`);
      return res.data;
    },
    onSuccess() {
      toast({
        variant: "default",
        description: "Convite aceito com sucesso",
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
