import { DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/modal";

export default function PostDetailsModal() {
  return (
    <Modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
        </DialogHeader>
        <div>Content</div>
        <DialogFooter>Footer</DialogFooter>
      </DialogContent>
    </Modal>
  );
}
