"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useLoggedUserInfo } from "@/features/auth/hooks/use-logged-user-info";
import { useAcceptInviteMutation } from "@/features/invites/mutations/use-accept-invite-mutation";
import { InviteStatus } from "@/types/invite";

type Props = {
  invite: {
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
  token: string;
};

export function AcceptInviteDialog(props: Props) {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  const { isPending, error, isError } = useLoggedUserInfo();
  const { mutate: acceptInviteMutation } = useAcceptInviteMutation(props.token);

  if (isPending) {
    return null;
  }

  const shouldShowLoginButton = isError || error;

  function handleSubmit() {
    acceptInviteMutation(undefined, {
      onSuccess() {
        setOpen(false);
        router.replace("/select-org");
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Convite de Organização</AlertDialogTitle>
          <AlertDialogDescription>
            {props.invite.invitedBy.name} convidou você para a organização{" "}
            <strong>{props.invite.organization.name}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full flex-row items-center justify-center sm:justify-center">
          {shouldShowLoginButton ? (
            <Link href={"/login"} className={buttonVariants({ variant: "default" })}>
              Fazer login
            </Link>
          ) : (
            <AlertDialogAction onClick={handleSubmit}>Aceitar</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
