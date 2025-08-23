import Link from "next/link";
import { Table, Rss } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { OrganizationCollapsible } from "./organization-collapsible";

export function NavigationGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navegação</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="flex items-center">
              <Link href={"/dashboard/posts"}>
                <Rss />
                Posts
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className="flex items-center">
              <Link href={"/dashboard/boards"}>
                <Table />
                Boards
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <OrganizationCollapsible />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
