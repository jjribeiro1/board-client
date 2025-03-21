import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MutationFnProps = {
  isPinned?: boolean;
};

export function useUpdatePostMutation(postId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: MutationFnProps) => {
      await apiClient.patch(`posts/${postId}`, data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["organization-posts"] });
      toast({
        variant: "default",
        description: "Post atualizado com sucesso",
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao atualizar post",
      });
    },
  });
}
