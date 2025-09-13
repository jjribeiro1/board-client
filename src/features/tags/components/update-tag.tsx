"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TagForm } from "./tag-form";
import { Tag } from "@/types/tag";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag: Tag;
};

export function UpdateTagDialog(props: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Tag</DialogTitle>
        </DialogHeader>

        <TagForm
          tag={props.tag}
          organizationId={props.tag.organizationId!}
          onSuccess={() => props.onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
