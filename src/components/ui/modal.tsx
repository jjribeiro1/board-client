"use client";
import { useRouter } from "next/navigation";
import { Dialog } from "./dialog";

type Props = {
  children: React.ReactNode;
};
export function Modal(props: Props) {
  const router = useRouter();
  return (
    <Dialog
      open={true}
      defaultOpen={true}
      onOpenChange={() => {
        router.back();
      }}
      modal={true}
    >
      {props.children}
    </Dialog>
  );
}
