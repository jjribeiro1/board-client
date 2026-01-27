import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { InviteMemberInput } from "../schemas/invite-member-schema";

export function useInviteMemberMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InviteMemberInput) => {
      const res = await apiClient.post(`/invites/`, data);
      return res.data;
    },
    onSuccess() {
      toast({
        variant: "default",
        description: "Convite enviado com sucesso",
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao enviar o convite",
      });
    },
  });
}
