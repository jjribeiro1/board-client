import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Invite, InviteStatus } from "@/types/invite";
import { ActionAlert } from "@/components/ui/alert";
import { useRetryInviteMutation } from "@/features/invites/mutations/use-retry-invite-mutation";

type Props = {
  invite: Invite;
};

export function OrganizationInvitesRowActions(props: Props) {
  const { mutate: retryInviteMutation, isPending } = useRetryInviteMutation(props.invite.id);

  const shouldDisableRetry =
    isPending || props.invite.status === InviteStatus.ACCEPTED || props.invite.status === InviteStatus.REVOKED;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <ActionAlert
          title="Reenviar convite"
          actionText="Confirmar"
          cancelText="Voltar"
          description="Tem certeza que deseja reenviar o convite para esse email? O usuário receberá um novo email com o convite para ingressar na organização."
          trigger={
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(e) => e.preventDefault()}
              disabled={shouldDisableRetry}
            >
              Reenviar convite
            </DropdownMenuItem>
          }
          onAction={retryInviteMutation}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
