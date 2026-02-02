"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useState, useCallback } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganizationStatus } from "@/features/organizations/hooks/use-organization-status";
import { useOrganizationTags } from "@/features/organizations/hooks/use-organization-tags";
import { useQueryParams } from "@/hooks/use-query-params";

export function FiltersGroup() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const [openStatusCollapsible, setOpenStatusCollapsible] = useState(false);
  const [openTagsCollapsible, setOpenTagsCollapsible] = useState(false);

  const { data: statuses, isLoading: isLoadingStatuses } = useOrganizationStatus(params.id);
  const { data: tags, isLoading: isLoadingTags } = useOrganizationTags(params.id);

  const { getQueryParam, getAllQueryParams, toggleQueryParam, hasQueryParam } = useQueryParams();

  const activeStatuses = getAllQueryParams("status");
  const activeTags = getAllQueryParams("tag");

  const clearFiltersOnly = useCallback(() => {
    const boardId = getQueryParam("board");
    if (boardId) {
      router.push(`${pathname}?board=${boardId}`);
    } else {
      router.push(pathname);
    }
  }, [getQueryParam, router, pathname]);

  function onResetFilters() {
    setOpenStatusCollapsible(false);
    setOpenTagsCollapsible(false);
  }

  const hasActiveFilters = hasQueryParam("status") || hasQueryParam("tag");

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filtros</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* Status */}
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
                  {isLoadingStatuses ? (
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
                            <Circle style={{ color: status.color }} fill={status.color} />
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

          {/* Tags */}
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
                  {isLoadingTags ? (
                    <>
                      <SidebarMenuSubItem>
                        <Skeleton className="h-8 w-full" />
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <Skeleton className="h-8 w-full" />
                      </SidebarMenuSubItem>
                    </>
                  ) : (
                    tags?.map((tag) => {
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
                    })
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  clearFiltersOnly();
                  onResetFilters();
                }}
              >
                <ChevronRight size={14} className="rotate-[-90deg]" />
                Limpar filtros
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
