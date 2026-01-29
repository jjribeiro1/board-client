import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error-message";

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
      queryClient.resetQueries({ queryKey: ["organization-boards"] });
      toast({
        title: "Configurações do canal atualizadas",
      });
    },
    onError(err) {
      toast({
        title: getErrorMessage(err),
        variant: "destructive",
      });
    },
  });
}
