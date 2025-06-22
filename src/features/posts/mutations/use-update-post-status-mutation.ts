import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { useQueryParams } from "@/hooks/use-query-params";
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
  const { getQueryParam } = useQueryParams();
  const queryClient = useQueryClient();
  const filters = {
    status: getQueryParam("status") as string,
    board: getQueryParam("board") as string,
  };

  return useMutation({
    mutationFn: async (data: MutationFnProps) => {
      const res = await apiClient.patch<MutationResponse>(`posts/${post.id}`, data);
      return res.data.data;
    },
    onSuccess(data) {
      const boardPostsQueryData = queryClient.getQueryData(["board-posts", post.boardId]);
      if (boardPostsQueryData) {
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
      }

      const organizationPostsQueryData = queryClient.getQueryData(["organization-posts", orgId, filters]);

      if (organizationPostsQueryData) {
        queryClient.setQueryData(["organization-posts", orgId, filters], (old: Post[]) => {
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
      }

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
