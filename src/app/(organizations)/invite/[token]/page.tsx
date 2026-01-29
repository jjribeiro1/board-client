"use client";

import { useParams } from "next/navigation";
import { AcceptInviteDialog } from "@/features/invites/components/accept-invite-dialog";
import { useInviteByToken } from "@/features/invites/hooks/use-invite-by-token";

export default function AcceptInvitePage() {
  const params = useParams();
  const token = params.token as string;

  const { data, isPending, error } = useInviteByToken(token);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg font-semibold">Convite inválido ou expirado</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AcceptInviteDialog invite={data} token={token} />
    </div>
  );
}
