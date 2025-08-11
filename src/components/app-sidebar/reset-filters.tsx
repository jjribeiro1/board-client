"use client";
import { Undo2 } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useQueryParams } from "@/hooks/use-query-params";

type Props = {
  onResetFilters: () => void;
};

export function ResetFilters(props: Props) {
  const { hasQueryParam, clearAllQueryParams } = useQueryParams();

  return (
    hasQueryParam() && (
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => {
            clearAllQueryParams();
            props.onResetFilters();
          }}
        >
          <Undo2 />
          Limpar filtros
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  );
}
