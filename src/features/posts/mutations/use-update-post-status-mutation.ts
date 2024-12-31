import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

type MutationFnProps = {
  statusId: string;
};

export function useUpdatePostStatusMutation(postId: string) {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: MutationFnProps) => {
      const res = await apiClient.patch(`posts/${postId}`, data);
      return res.data;
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao mudar status do post",
      });
    },
  });
}
