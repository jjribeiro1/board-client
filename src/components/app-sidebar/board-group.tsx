"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
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
import { useOrganizationBoards } from "@/features/organizations/hooks/use-organization-boards";

type Props = {
  organizationId: string;
};

export function BoardGroup(props: Props) {
  const [openCollapsible, setOpenCollapsible] = useState(false);
  const { data } = useOrganizationBoards(props.organizationId);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filtros rápidos</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Collapsible open={openCollapsible} onOpenChange={setOpenCollapsible}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="flex items-center">Boards</SidebarMenuButton>
              </CollapsibleTrigger>
              <SidebarMenuBadge>
                <ChevronRight size={14} className={`${openCollapsible ? "rotate-90 duration-200" : ""}`} />
              </SidebarMenuBadge>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {data?.map((board) => (
                    <SidebarMenuSubItem key={board.id}>
                      <SidebarMenuButton>{board.title}</SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
