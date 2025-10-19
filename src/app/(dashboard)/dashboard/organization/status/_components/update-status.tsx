"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StatusForm } from "./status-form";
import { Status } from "@/types/status";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: Status;
};

export function UpdateStatusDialog(props: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Status</DialogTitle>
        </DialogHeader>

        <StatusForm
          status={props.status}
          organizationId={props.status.organizationId!}
          onSuccess={() => props.onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
