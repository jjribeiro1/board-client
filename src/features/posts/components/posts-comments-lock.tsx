import { MessagesSquare } from "lucide-react";
import { useManagePostSettingsMutation } from "../mutations/use-manage-post-settings-mutation";
import { Post } from "@/types/post";

type Props = {
  post: Post;
};

export function PostCommentsLock(props: Props) {
  const { mutate: managePostSettingsMutation } = useManagePostSettingsMutation(props.post.id);

  return (
    <div
      className="hover:bg-secondary focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
      onClick={() => managePostSettingsMutation({ isLocked: !props.post.isLocked })}
    >
      <MessagesSquare />
      {props.post.isLocked ? "Habilitar comentários" : "Desabilitar comentários"}
    </div>
  );
}
