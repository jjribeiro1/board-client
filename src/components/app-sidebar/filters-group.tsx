"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight, Circle, Tag } from "lucide-react";
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
import { useOrganizationStatus } from "@/features/organizations/hooks/use-organization-status";
import { useOrganizationTags } from "@/features/organizations/hooks/use-organization-tags";
import { useQueryParams } from "@/hooks/use-query-params";

type Props = {
  organizationId: string;
};

export function FiltersGroup(props: Props) {
  const pathName = usePathname();
  const [openBoardsCollapsible, setOpenBoardsCollapsible] = useState(false);
  const [openStatusCollapsible, setOpenStatusCollapsible] = useState(false);
  const [openTagsCollapsible, setOpenTagsCollapsible] = useState(false);

  const { data: boardsData } = useOrganizationBoards(props.organizationId);
  const { data: statusData } = useOrganizationStatus(props.organizationId);
  const { data: tagsData } = useOrganizationTags(props.organizationId);
  const { getQueryParam, getAllQueryParams, setQueryParam, toggleQueryParam } = useQueryParams();

  function onResetFilters() {
    setOpenBoardsCollapsible(false);
    setOpenStatusCollapsible(false);
    setOpenTagsCollapsible(false);
  }

  if (pathName !== "/dashboard/posts") {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filtros</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible open={openBoardsCollapsible} onOpenChange={setOpenBoardsCollapsible}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="flex items-center">Canais</SidebarMenuButton>
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
                    const activeStatuses = getAllQueryParams("status");
                    const isActive = activeStatuses.includes(status.id);
                    return (
                      <SidebarMenuSubItem key={status.id}>
                        <SidebarMenuButton
                          onClick={() => toggleQueryParam("status", status.id)}
                          className={`flex items-center gap-2 ${isActive ? "bg-sidebar-accent" : ""}`}
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

          <Collapsible open={openTagsCollapsible} onOpenChange={setOpenTagsCollapsible}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="flex items-center">Tags</SidebarMenuButton>
              </CollapsibleTrigger>
              <SidebarMenuBadge>
                <ChevronRight size={14} className={`${openTagsCollapsible ? "rotate-90 duration-200" : ""}`} />
              </SidebarMenuBadge>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {tagsData?.map((tag) => {
                    const activeTags = getAllQueryParams("tag");
                    const isActive = activeTags.includes(tag.id);
                    return (
                      <SidebarMenuSubItem key={tag.id}>
                        <SidebarMenuButton
                          onClick={() => toggleQueryParam("tag", tag.id)}
                          className={`flex items-center gap-2 ${isActive ? "bg-sidebar-accent" : ""}`}
                        >
                          <Tag size={14} style={{ color: tag.color }} />
                          {tag.name}
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
