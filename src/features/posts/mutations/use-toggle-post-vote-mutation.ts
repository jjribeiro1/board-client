"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import type { BoardPostData } from "@/features/board/hooks/use-board-posts";

type MutationResponse = {
  message: string;
  voted: boolean;
};

export function useTogglePostVoteMutation(postId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post<MutationResponse>(`/posts/${postId}/vote`);
      return res.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["board-posts"] });

      const previousBoardPosts = queryClient.getQueriesData({ queryKey: ["board-posts"] });

      queryClient.setQueriesData<BoardPostData[]>({ queryKey: ["board-posts"] }, (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((post) => {
          if (post.id === postId) {
            const willVote = !post.userHasVoted;
            const newVoteCount = willVote ? post._count.votes + 1 : post._count.votes - 1;

            return {
              ...post,
              userHasVoted: willVote,
              _count: {
                ...post._count,
                votes: Math.max(0, newVoteCount),
              },
            };
          }
          return post;
        });
      });

      return { previousBoardPosts };
    },
    onSuccess: (data) => {
      queryClient.setQueriesData<BoardPostData[]>({ queryKey: ["board-posts"] }, (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              userHasVoted: data.voted,
            };
          }
          return post;
        });
      });
    },
    onError: (err, _, context) => {
      if (context?.previousBoardPosts) {
        context.previousBoardPosts.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      const error = err as AxiosError;
      const response = error.response?.data as { message: string } | undefined;
      const message = response?.message;

      toast({
        variant: "destructive",
        description: message || "Erro inesperado ao votar no post",
      });
    },
  });
}
