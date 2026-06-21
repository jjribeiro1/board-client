"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import type { CreateRoadmapInput } from "../schemas/create-roadmap-schema";
import { getErrorMessage } from "@/lib/error-message";

export function useCreateRoadmapMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoadmapInput) => {
      const res = await apiClient.post("/roadmaps", data);
      return res.data;
    },
    onSuccess() {
      toast({ variant: "default", description: "Roadmap criado com sucesso" });
      queryClient.invalidateQueries({ queryKey: ["organization-roadmaps"] });
    },
    onError(err) {
      toast({ variant: "destructive", description: getErrorMessage(err) });
    },
  });
}
