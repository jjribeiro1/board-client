import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUpdatePostStatusMutation } from "@/features/posts/mutations/use-update-post-status-mutation";
import { useOrganizationStatus } from "@/hooks/use-organization-status";
import { Post } from "@/types/post";

type Props = {
  orgId: string;
  post: Post;
};

export function PostStatusDropdown(props: Props) {
  const { data } = useOrganizationStatus();
  const { mutate } = useUpdatePostStatusMutation(props.post.id, props.orgId);

  function handlePostStatusChange(statusId: string) {
    mutate({ statusId });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} className={`h-max py-1`}>
          {props.post.status.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {data?.map((status) => (
          <DropdownMenuItem key={status.id} onClick={() => handlePostStatusChange(status.id)}>
            {status.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
