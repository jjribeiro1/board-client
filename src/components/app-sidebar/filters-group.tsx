"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight, Circle } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ResetFilters } from "./reset-filters";
import { useOrganizationBoards } from "@/features/organizations/hooks/use-organization-boards";
import { useQueryParams } from "@/hooks/use-query-params";
import { useOrganizationStatus } from "@/hooks/use-organization-status";

type Props = {
  organizationId: string;
};

export function FiltersGroup(props: Props) {
  const pathName = usePathname();
  const [openBoardsCollapsible, setOpenBoardsCollapsible] = useState(false);
  const [openStatusCollapsible, setOpenStatusCollapsible] = useState(false);

  const { data: boardsData } = useOrganizationBoards(props.organizationId);
  const { data: statusData } = useOrganizationStatus(props.organizationId);
  const { getQueryParam, setQueryParam } = useQueryParams();

  function onResetFilters() {
    setOpenBoardsCollapsible(false);
    setOpenStatusCollapsible(false);
  }

  if (pathName !== "/dashboard/posts") {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filtros rápidos</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible open={openBoardsCollapsible} onOpenChange={setOpenBoardsCollapsible}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="flex items-center">Boards</SidebarMenuButton>
              </CollapsibleTrigger>
              <SidebarMenuBadge>
                <ChevronRight size={14} className={`${openBoardsCollapsible ? "rotate-90 duration-200" : ""}`} />
              </SidebarMenuBadge>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {boardsData?.map((board) => {
                    const isActive = getQueryParam("board") === board.id;

                    return (
                      <SidebarMenuSubItem key={board.id}>
                        <SidebarMenuButton
                          onClick={() => setQueryParam("board", board.id)}
                          className={`flex items-center ${isActive ? "bg-sidebar-accent" : ""}`}
                        >
                          {board.title}
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <Collapsible open={openStatusCollapsible} onOpenChange={setOpenStatusCollapsible}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="flex items-center">Status</SidebarMenuButton>
              </CollapsibleTrigger>
              <SidebarMenuBadge>
                <ChevronRight size={14} className={`${openStatusCollapsible ? "rotate-90 duration-200" : ""}`} />
              </SidebarMenuBadge>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {statusData?.map((status) => {
                    const isActive = getQueryParam("status") === status.id;
                    return (
                      <SidebarMenuSubItem key={status.id}>
                        <SidebarMenuButton
                          onClick={() => setQueryParam("status", status.id)}
                          className={`flex items-center ${isActive ? "bg-sidebar-accent" : ""}`}
                        >
                          <Circle style={{ color: status.color }} fill={status.color} />
                          {status.name}
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          <ResetFilters onResetFilters={onResetFilters} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
