"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/error-message";

export function useMarkNotificationReadMutation(notificationId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.patch(`/notifications/${notificationId}/read`);
    },
    onSuccess() {
      toast({ description: "Notificação marcada como lida" });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
    },
    onError(err) {
      toast({ variant: "destructive", description: getErrorMessage(err) });
    },
  });
}
