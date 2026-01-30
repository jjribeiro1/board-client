"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/error-message";
import { OrganizationPostsData } from "@/types/organization-posts";
import { BoardPostData } from "@/features/board/hooks/use-board-posts";

export function useDeleteCommentMutation({ commentId, postId }: { commentId: string; postId: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.delete<void>(`/comments/${commentId}`);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      queryClient.setQueriesData<OrganizationPostsData[]>({ queryKey: ["organization-posts"] }, (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              _count: {
                ...post._count,
                comments: post._count.comments - 1,
              },
            };
          }
          return post;
        });
      });
      queryClient.setQueriesData<BoardPostData[]>({ queryKey: ["board-posts"] }, (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              _count: {
                ...post._count,
                comments: post._count.comments - 1,
              },
            };
          }
          return post;
        });
      });
      toast({
        variant: "default",
        description: "Comentário removido com sucesso",
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
