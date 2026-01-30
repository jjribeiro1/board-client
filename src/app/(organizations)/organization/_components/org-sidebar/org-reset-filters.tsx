"use client";

import { Undo2 } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useQueryParams } from "@/hooks/use-query-params";

export function OrgResetFilters() {
  const { hasQueryParam, clearAllQueryParams } = useQueryParams();

  if (!hasQueryParam("status")) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                clearAllQueryParams();
              }}
            >
              <Undo2 />
              Limpar filtros
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
