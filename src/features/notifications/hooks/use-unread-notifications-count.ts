import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

type UnreadNotificationsCountResponse = {
  data: {
    count: number;
  };
};

export function useUnreadNotificationsCount() {
  return useQuery({
    queryKey: ["notifications-unread-count"],
    queryFn: async () => {
      const res = await apiClient.get<UnreadNotificationsCountResponse>("/notifications/unread-count");
      return res.data.data.count;
    },
    staleTime: 1000 * 60 * 5,
  });
}
