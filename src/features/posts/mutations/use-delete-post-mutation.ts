import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

export function useDeletePostMutation(postId: string) {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete(`posts/${postId}`);
    },
    onSuccess() {
      toast({
        variant: "default",
        description: "Post removido com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["board-posts"] });
      queryClient.invalidateQueries({ queryKey: ["organization-posts"] });
      setTimeout(() => {
        router.back();
      }, 150);
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao mudar remover post",
      });
    },
  });
}
