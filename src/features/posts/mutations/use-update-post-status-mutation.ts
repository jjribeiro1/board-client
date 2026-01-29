import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/post";
import { getErrorMessage } from "@/lib/error-message";

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

      queryClient.setQueryData(["post", post.id], (old: Post | undefined) => {
        if (!old) return old;
        return {
          ...old,
          status: data.post.status,
        };
      });
    },
    onError(err) {
      toast({
        variant: "destructive",
        description: getErrorMessage(err)
      });
    },
  });
}
