"use client";
import Link from "next/link";
import { useState } from "react";
import { Users, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function OrganizationCollapsible() {
  const [openOrganizationCollapsible, setOpenOrganizationCollapsible] = useState(false);

  return (
    <Collapsible open={openOrganizationCollapsible} onOpenChange={setOpenOrganizationCollapsible}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="flex items-center">
            <Users />
            Organização
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <SidebarMenuBadge>
          <ChevronRight size={14} className={`${openOrganizationCollapsible ? "rotate-90 duration-200" : ""}`} />
        </SidebarMenuBadge>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuButton>
                <Link href={"/dashboard/organization/members"}>Gerenciar membros</Link>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
