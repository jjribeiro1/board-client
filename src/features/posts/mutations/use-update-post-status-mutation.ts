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

export function useUpdatePostStatusMutation(post: Post) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MutationFnProps) => {
      const res = await apiClient.patch<MutationResponse>(`posts/${post.id}`, data);
      return res.data.data;
    },
    onSuccess(data) {
      const oldBoardPosts = queryClient.getQueryData(["board-posts", post.boardId]);
      console.log(oldBoardPosts);
      queryClient.setQueryData(["board-posts", post.boardId], (old: Post[]) => {
        return old.map((postItem) => {
          if (postItem.id === data.post.id) {
            return {
              ...postItem,
              status: data.post.status,
            };
          }
          return postItem;
        });
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
