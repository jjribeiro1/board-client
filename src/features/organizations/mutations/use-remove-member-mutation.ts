"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/error-message";

type MutationParams = {
  organizationId: string;
  userId: string;
};

export function useRemoveMemberMutation({ organizationId, userId }: MutationParams) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.delete(`/organizations/${organizationId}/members/${userId}`);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["organization-members", organizationId] });
      toast({
        variant: "default",
        description: "Membro removido com sucesso",
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
