"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import type { AddPostToColumnInput } from "../schemas/add-post-to-column-schema";
import { getErrorMessage } from "@/lib/error-message";

export function useAddPostToColumnMutation(roadmapId: string, columnId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddPostToColumnInput) => {
      const res = await apiClient.post(`/roadmap-columns/${columnId}/items`, data);
      return res.data;
    },
    onSuccess() {
      toast({ variant: "default", description: "Post adicionado à coluna com sucesso" });
      queryClient.invalidateQueries({ queryKey: ["roadmap", roadmapId] });
    },
    onError(err) {
      toast({ variant: "destructive", description: getErrorMessage(err) });
    },
  });
}
