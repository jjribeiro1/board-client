import { apiClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type LoggedUserInfo = {
  id: string;
  name: string;
  email: string;
  organizationsIds: string[];
  createdAt: Date;
  updatedAt: Date;
};

export function useLoggedUserInfo() {
  return useQuery({
    queryKey: ["logged-user-info"],
    queryFn: async () => {
      const res = await apiClient.get<LoggedUserInfo>("/auth/me");
      const data = res.data;
      return data;
    },
  });
}
