"use client";
import { useState } from "react";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionAlert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UpdateMemberRoleDialog } from "../../../../../../../features/organizations/components/update-member-role-dialog";
import { useRemoveMemberMutation } from "@/features/organizations/mutations/use-remove-member-mutation";

type Member = {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  createdAt: Date;
};

type Props = {
  member: Member;
  organizationId: string;
};

export function MembersRowActions(props: Props) {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const { mutate: removeMemberMutation } = useRemoveMemberMutation({
    organizationId: props.organizationId,
    userId: props.member.id,
  });

  const isOwner = props.member.role === "OWNER";

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <Ellipsis className="cursor-pointer" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setOpenUpdateDialog(true)} className="cursor-pointer" disabled={isOwner}>
            <Pencil />
            Editar permissão
          </DropdownMenuItem>

          <ActionAlert
            title="Remover membro"
            actionText="Remover"
            cancelText="Cancelar"
            description={`Tem certeza que deseja remover ${props.member.name} da organização? Esta ação não pode ser desfeita.`}
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer" disabled={isOwner}>
                <Trash />
                Remover membro
              </DropdownMenuItem>
            }
            onAction={removeMemberMutation}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateMemberRoleDialog
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        organizationId={props.organizationId}
        userId={props.member.id}
        currentRole={props.member.role}
        memberName={props.member.name}
      />
    </>
  );
}
