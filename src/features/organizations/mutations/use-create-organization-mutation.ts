import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { CreateOrganizationInput } from "../schemas/create-organization-schema";
import { selectOrganizationAction } from "../actions/select-organization-action";

export function useCreateOrganizationMutation() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: CreateOrganizationInput) => {
      const res = await apiClient.post<string>("/organizations", data);
      return res.data;
    },
    onSuccess(data: string) {
      toast({
        variant: "default",
        description: "Organização criada com sucesso",
      });
      selectOrganizationAction(data);
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao criar uma nova organização",
      });
    },
  });
}
