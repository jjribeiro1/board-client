"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "./dialog";

type Props = {
  children: React.ReactNode;
};
export function Modal(props: Props) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        router.back();
        setOpen(open);
      }}
      modal={true}
    >
      {props.children}
    </Dialog>
  );
}
