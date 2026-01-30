"use client";

import { useParams } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useOrganizationStatus } from "@/features/organizations/hooks/use-organization-status";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryParams } from "@/hooks/use-query-params";

export function StatusGroup() {
  const params = useParams<{ id: string }>();
  const { getQueryParam, setQueryParam } = useQueryParams();

  const { data: statuses, isLoading } = useOrganizationStatus(params.id);
  const activeStatus = getQueryParam("status");

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Status</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {isLoading ? (
            <>
              <SidebarMenuItem>
                <Skeleton className="h-8 w-full" />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Skeleton className="h-8 w-full" />
              </SidebarMenuItem>
            </>
          ) : (
            statuses?.map((status) => {
              const isActive = activeStatus === status.id;
              return (
                <SidebarMenuItem key={status.id}>
                  <SidebarMenuButton
                    onClick={() => setQueryParam("status", status.id)}
                    className={`flex items-center gap-2 ${isActive ? "bg-sidebar-accent" : ""}`}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: status.color }} />
                    {status.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
