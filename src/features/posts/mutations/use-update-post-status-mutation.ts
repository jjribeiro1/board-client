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

export function useUpdatePostStatusMutation(postId: string, orgId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MutationFnProps) => {
      const res = await apiClient.patch<MutationResponse>(`posts/${postId}`, data);
      return res.data.data;
    },
    async onSuccess(data) {
      queryClient.setQueryData(["organization-posts", orgId], (old: Post[]) => {
        return old.map((post) => {
          if (post.id === data.post.id) {
            return {
              ...post,
              status: data.post.status,
            };
          }
          return post;
        });
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
