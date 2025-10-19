"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StatusForm } from "./status-form";

type Props = {
  organizationId: string;
};

export function CreateStatusDialog(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} size={"sm"}>
          <Plus />
          Criar Status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Status</DialogTitle>
        </DialogHeader>

        <StatusForm organizationId={props.organizationId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
