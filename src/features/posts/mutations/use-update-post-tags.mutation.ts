import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error-message";

type MutationFnProps = {
  tagIds: string[];
};

export function useUpdatePostTagsMutation(postId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MutationFnProps) => {
      const res = await apiClient.patch(`/posts/${postId}/tags`, data);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
      queryClient.invalidateQueries({ queryKey: ["organization-posts"] });
      toast({
        description: "Tags atualizadas com sucesso",
      });
    },
    onError(err) {
      toast({
        description: getErrorMessage(err),
        variant: "destructive",
      });
    },
  });
}
