"use client";
import { Circle } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ResetFilters } from "./reset-filters";
import { useOrganizationStatus } from "@/hooks/use-organization-status";
import { useQueryParams } from "@/hooks/use-query-params";

const icons: { [key: number]: React.ReactNode } = {
  1: <Circle />,
  2: <Circle className="text-purple-500" />,
  3: <Circle className="text-yellow-500" />,
  4: <Circle className="text-blue-500" />,
  5: <Circle className="text-green-500" />,
  6: <Circle className="text-red-500" />,
};

export function StatusGroup() {
  const { data } = useOrganizationStatus();
  const { setQueryParam, getQueryParam } = useQueryParams();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Status</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {data?.map((status, idx) => {
            const isActive = getQueryParam("status") === status.id;
            return (
              <SidebarMenuItem key={status.id}>
                <SidebarMenuButton
                  onClick={() => setQueryParam("status", status.id)}
                  className={`flex items-center ${isActive ? "bg-sidebar-accent" : ""}`}
                >
                  {icons[idx + 1]}
                  {status.name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          <ResetFilters />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
