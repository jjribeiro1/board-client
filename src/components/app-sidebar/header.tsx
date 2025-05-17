"use client";
import Link from "next/link";
import { CircleArrowOutUpRight } from "lucide-react";
import { SidebarHeader as SidebarHeaderUI } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { useOrganizationInfo } from "@/features/organizations/hooks/use-organization-info";

type Props = {
  organizationId: string;
};

export function SidebarHeader(props: Props) {
  const { data } = useOrganizationInfo(props.organizationId);
  return (
    <SidebarHeaderUI>
      <div className="flex items-center justify-between px-2">
        <p className="text-xl font-semibold tracking-tight text-center">{data?.name}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/organization/${data?.id}`}
                target="_blank"
                className={buttonVariants({ size: "icon", variant: "ghost" })}
              >
                <CircleArrowOutUpRight className="w-3.5 h-3.5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Veja a página da sua organização</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </SidebarHeaderUI>
  );
}
