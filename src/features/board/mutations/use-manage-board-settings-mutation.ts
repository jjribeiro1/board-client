import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/axios";

type MutationFnProps = {
  title?: string;
  description?: string;
  isLocked?: boolean;
};

export function useManageBoardSettings(boardId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: MutationFnProps) => {
      await apiClient.patch(`/boards/${boardId}/settings`, data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["organization-boards"] });
      toast({
        title: "Configurações do board atualizadas",
      });
    },
    onError() {
      toast({
        title: "Erro ao atualizar configurações do quadro.",
        variant: "destructive",
      });
    },
  });
}
