import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Notification } from "@/types/notification";

type NotificationsResponse = {
  data: Notification[];
};

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await apiClient.get<NotificationsResponse>("/notifications");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
