"use client";
import { Undo2 } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useQueryParams } from "@/hooks/use-query-params";

export function ResetFilters() {
  const { hasQueryParam, clearAllQueryParams } = useQueryParams();

  return (
    hasQueryParam() && (
      <SidebarMenuItem>
        <SidebarMenuButton onClick={clearAllQueryParams} className="">
          <Undo2 />
          Limpar filtros
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  );
}
