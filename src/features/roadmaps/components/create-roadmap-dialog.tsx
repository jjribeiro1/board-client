"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RoadmapForm } from "./roadmap-form";

type CreateRoadmapDialogProps = {
  organizationId: string;
};

export function CreateRoadmapDialog({ organizationId }: CreateRoadmapDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <Plus />
          Criar Roadmap
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Roadmap</DialogTitle>
        </DialogHeader>
        <RoadmapForm organizationId={organizationId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
