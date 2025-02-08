"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";

export default function PageIntercepted() {
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
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
        </DialogHeader>
        <div>Content</div>
        <DialogFooter>Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
