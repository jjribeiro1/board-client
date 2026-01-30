"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { CreateCommentInput } from "../schemas/create-comment-schema";
import { getErrorMessage } from "@/lib/error-message";
import { OrganizationPostsData } from "@/types/organization-posts";
import { BoardPostData } from "@/features/board/hooks/use-board-posts";

export function useCreateCommentMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateCommentInput) => {
      const res = await apiClient.post<string>("/comments", data);
      return res.data;
    },
    onSuccess(_data, variables) {
      queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      queryClient.setQueriesData<OrganizationPostsData[]>({ queryKey: ["organization-posts"] }, (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((post) => {
          if (post.id === variables.postId) {
            return {
              ...post,
              _count: {
                ...post._count,
                comments: post._count.comments + 1,
              },
            };
          }
          return post;
        });
      });
      queryClient.setQueriesData<BoardPostData[]>({ queryKey: ["board-posts"] }, (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((post) => {
          if (post.id === variables.postId) {
            return {
              ...post,
              _count: {
                ...post._count,
                comments: post._count.comments + 1,
              },
            };
          }
          return post;
        });
      });

      toast({
        variant: "default",
        description: "Comentário criado com sucesso",
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
