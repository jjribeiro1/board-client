"use client";
import Link from "next/link";
import { CircleArrowOutUpRight } from "lucide-react";
import { SidebarHeader as SidebarHeaderUI, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { OrganizationSwitcher } from "@/features/organizations/components/organization-switcher";
import { useLoggedUserInfo } from "@/features/auth/hooks/use-logged-user-info";

type Props = {
  organizationId: string;
};

export function SidebarHeader(props: Props) {
  const { data: loggedUser } = useLoggedUserInfo();
  const organizations = loggedUser?.organizations;
  const activeOrganization = organizations?.find((org) => org.id === props.organizationId);

  return (
    <SidebarHeaderUI>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-between">
          <p className="text-center text-xl font-semibold tracking-tighter">{activeOrganization?.name}</p>

          <div className="flex items-center">
            <OrganizationSwitcher organizations={organizations!} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/organization/${activeOrganization?.id}`}
                    target="_blank"
                    className={buttonVariants({ size: "icon", variant: "ghost" })}
                  >
                    <CircleArrowOutUpRight className="h-3.5 w-3.5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Veja a página da sua organização</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeaderUI>
  );
}
