import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSystemDefaultStatus } from "@/hooks/use-system-default-status";
import { useUpdatePostStatusMutation } from "@/features/posts/mutations/use-update-post-status-mutation";

const statusColors: { [key in number]: string } = {
  1: "bg-primary-foreground text-white hover:bg-primary-foreground/85",
  2: "bg-purple-500 text-white hover:bg-purple-500/85",
  3: "bg-yellow-500 text-white hover:bg-yellow-500/85",
  4: "bg-blue-500 text-white hover:bg-blue-500/85",
  5: "bg-green-500 text-white hover:bg-green-500/85",
  6: "bg-red-500 text-white hover:bg-red-500/85",
};

type Props = {
  orgId: string;
  post: {
    id: string;
    status: {
      id: string;
      name: string;
      order: number;
    };
  };
};

export function PostStatusDropdown(props: Props) {
  const { data } = useSystemDefaultStatus();
  const { mutate } = useUpdatePostStatusMutation(props.post.id, props.orgId);

  function filterStatus(status: {
    id: string;
    name: string;
    order: number | null;
  }) {
    if (
      status.order === null ||
      status.order <= 1 ||
      status.name === props.post.status.name
    ) {
      return false;
    }

    return true;
  }

  function handlePostStatusChange(statusId: string) {
    mutate({ statusId });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          className={`${statusColors[props.post.status.order]} py-1 h-max`}
        >
          {props.post.status.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {data?.filter(filterStatus).map((status) => (
          <DropdownMenuItem
            key={status.id}
            onClick={() => handlePostStatusChange(status.id)}
          >
            {status.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
