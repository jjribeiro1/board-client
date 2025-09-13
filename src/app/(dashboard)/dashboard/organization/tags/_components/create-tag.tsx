"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TagForm } from "./tag-form";

type Props = {
  organizationId: string;
};

export function CreateTagDialog(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Criar Tag</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Tag</DialogTitle>
        </DialogHeader>

        <TagForm organizationId={props.organizationId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
