import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MutationFnProps = {
  isLocked?: boolean;
  isPinned?: boolean;
};

export function useManagePostSettingsMutation(postId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: MutationFnProps) => {
      await apiClient.patch(`/posts/${postId}/settings`, data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["organization-posts"] });
      queryClient.invalidateQueries({ queryKey: ["board-posts"] });

      toast({
        variant: "default",
        description: "Configurações do post atualizada com sucesso",
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
