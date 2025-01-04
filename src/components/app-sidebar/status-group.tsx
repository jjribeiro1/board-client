"use client";
import { Circle, CircleCheck, CircleX, Loader, CircleAlert, CircleDot } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ResetFilters } from "./reset-filters";
import { useSystemDefaultStatus } from "@/hooks/use-system-default-status";
import { useQueryParams } from "@/hooks/use-query-params";

const icons: { [key: number]: React.ReactNode } = {
  1: <Circle />,
  2: <CircleAlert className="text-purple-500" />,
  3: <CircleDot className="text-yellow-500" />,
  4: <Loader className="text-blue-500" />,
  5: <CircleCheck className="text-green-500" />,
  6: <CircleX className="text-red-500" />,
};

export function StatusGroup() {
  const { data } = useSystemDefaultStatus();
  const { setQueryParam } = useQueryParams();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Status</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {data?.map((status) => (
            <SidebarMenuItem key={status.id}>
              <SidebarMenuButton onClick={() => setQueryParam("status", status.id)} className="flex items-center">
                {icons[status.order!]}
                {status.name}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <ResetFilters />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
