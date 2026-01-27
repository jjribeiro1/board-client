"use client";

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
import { useLoggedUserInfo } from "@/features/auth/hooks/use-logged-user-info";
import { InviteStatus } from "@/types/invite";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type Props = {
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

export function AcceptInviteDialog(props: Props) {
  const [open, setOpen] = useState(true);
  const { isPending, error, isError } = useLoggedUserInfo();

  if (isPending) {
    return null;
  }

  const shouldShowLoginButton = isError || error;

  function handleSubmit() {}

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Convite de Organização</AlertDialogTitle>
          <AlertDialogDescription>
            {props.data.invitedBy.name} convidou você para a organização <strong>{props.data.organization.name}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
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
