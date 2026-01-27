import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { InviteStatus } from "@/types/invite";

type InviteByTokenResponse = {
  data: {
    id: string;
    email: string;
    createdAt: Date;
    expiresAt: Date;
    status: InviteStatus;
    role: "OWNER" | "ADMIN" | "MEMBER";
    invitedBy: {
      name: string;
    };
    organization: {
      name: string;
    };
  };
};

export function useInviteByToken(token: string) {
  return useQuery({
    queryKey: ["invite-by-token", token],
    queryFn: async () => {
      const res = await apiClient.get<InviteByTokenResponse>(`/invites/${token}`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });
}
