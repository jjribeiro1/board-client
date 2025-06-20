import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectOrganizationAction } from "../actions/select-organization-action";

type Props = {
  organizations: Array<{ organizationId: string; name: string; role: string }>;
};

export function OrganizationSwitcher(props: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  function handleOrganizationChange(organizationId: string) {
    router.refresh();
    queryClient.clear();
    selectOrganizationAction(organizationId);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Suas organizações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {props.organizations?.map((org) => (
          <DropdownMenuItem
            key={org.organizationId}
            onClick={() => handleOrganizationChange(org.organizationId)}
            className="cursor-pointer"
          >
            {org.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
