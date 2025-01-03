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
import { useSystemDefaultStatus } from "@/hooks/use-system-default-status";

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

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Status</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {data?.map((status) => (
            <SidebarMenuItem key={status.id}>
              <SidebarMenuButton className="flex items-center">
                {icons[status.order!]}
                {status.name}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
