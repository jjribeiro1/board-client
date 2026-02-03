"use client";
import { SidebarFooter as SidebarFooterUI, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";

export function SidebarFooter() {
  return (
    <SidebarFooterUI>
      <SidebarMenu>
        <SidebarMenuItem>
          <UserAvatarDropdown />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooterUI>
  );
}
