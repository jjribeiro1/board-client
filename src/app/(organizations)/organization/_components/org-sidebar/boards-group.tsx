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
import { useOrganizationBoards } from "@/features/organizations/hooks/use-organization-boards";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryParams } from "@/hooks/use-query-params";

export function BoardsGroup() {
  const params = useParams<{ id: string }>();
  const { getQueryParam, setQueryParam } = useQueryParams();

  const { data: boards, isLoading } = useOrganizationBoards(params.id);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Canais</SidebarGroupLabel>
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
            boards?.map((board) => {
              const isActive = getQueryParam("board") === board.id;
              return (
                <SidebarMenuItem key={board.id}>
                  <SidebarMenuButton
                    onClick={() => setQueryParam("board", board.id)}
                    className={`flex items-center ${isActive ? "bg-sidebar-accent" : ""}`}
                  >
                    {board.title}
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
