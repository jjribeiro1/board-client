"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useOrganizationStatus } from "@/features/organizations/hooks/use-organization-status";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryParams } from "@/hooks/use-query-params";

export function StatusGroup() {
  const params = useParams<{ id: string }>();
  const { getAllQueryParams, toggleQueryParam } = useQueryParams();
  const [openCollapsible, setOpenCollapsible] = useState(false);

  const { data: statuses, isLoading } = useOrganizationStatus(params.id);
  const activeStatuses = getAllQueryParams("status");

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Status</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible open={openCollapsible} onOpenChange={setOpenCollapsible}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="flex items-center">Status</SidebarMenuButton>
              </CollapsibleTrigger>
              <SidebarMenuBadge>
                <ChevronRight size={14} className={`${openCollapsible ? "rotate-90 duration-200" : ""}`} />
              </SidebarMenuBadge>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {isLoading ? (
                    <>
                      <SidebarMenuSubItem>
                        <Skeleton className="h-8 w-full" />
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <Skeleton className="h-8 w-full" />
                      </SidebarMenuSubItem>
                    </>
                  ) : (
                    statuses?.map((status) => {
                      const isActive = activeStatuses.includes(status.id);
                      return (
                        <SidebarMenuSubItem key={status.id}>
                          <SidebarMenuButton
                            onClick={() => toggleQueryParam("status", status.id)}
                            className={`flex items-center gap-2 ${isActive ? "bg-sidebar-accent" : ""}`}
                          >
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: status.color }} />
                            {status.name}
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      );
                    })
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
