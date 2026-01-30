"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { UpdateMemberRoleInput } from "../schemas/update-member-role-schema";
import { getErrorMessage } from "@/lib/error-message";

type MutationParams = {
  organizationId: string;
  userId: string;
};

export function useUpdateMemberRoleMutation({ organizationId, userId }: MutationParams) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: UpdateMemberRoleInput) => {
      const res = await apiClient.patch(`/organizations/${organizationId}/members/${userId}/role`, data);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["organization-members", organizationId] });
      toast({
        variant: "default",
        description: "Permissão atualizada com sucesso",
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
