import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/post";

type MutationFnProps = {
  statusId: string;
};

type MutationResponse = {
  data: {
    post: Post;
  };
};

export function useUpdatePostStatusMutation(post: Post, orgId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MutationFnProps) => {
      const res = await apiClient.patch<MutationResponse>(`/posts/${post.id}/settings`, data);
      return res.data.data;
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["organization-posts", orgId],
      });

      queryClient.invalidateQueries({
        queryKey: ["board-posts", post.boardId],
      });

      queryClient.setQueryData(["post", post.id], (old: Post) => {
        return {
          ...old,
          status: data.post.status,
        };
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao mudar status do post",
      });
    },
  });
}
