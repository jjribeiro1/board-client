import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  title: string;
  description: string;
  cancelText: string;
  actionText: string;
  trigger: React.ReactNode;
  onAction: () => void;
};

export function ActionAlert(props: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{props.cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={props.onAction}>{props.actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
