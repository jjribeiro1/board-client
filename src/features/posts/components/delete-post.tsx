import { Trash } from "lucide-react";
import { ActionAlert } from "@/components/ui/alert";
import { useDeletePostMutation } from "../mutations/use-delete-post-mutation";
import { Post } from "@/types/post";

type Props = {
  post: Post;
};

export function DeletePost(props: Props) {
  const { mutate: deletePostMutation } = useDeletePostMutation(props.post.id);

  return (
    <ActionAlert
      title="Você tem certeza?"
      description="O Post será removido e todos os dados associados serão perdidos"
      cancelText="Cancelar"
      actionText="Confirmar"
      trigger={
        <div className="hover:bg-secondary focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
          <Trash />
          Remover post
        </div>
      }
      onAction={deletePostMutation}
    />
  );
}
