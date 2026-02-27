"use client";
import { SidebarFooter as SidebarFooterUI, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { NotificationBell } from "@/features/notifications/components/notification-bell";

export function SidebarFooter() {
  return (
    <SidebarFooterUI>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-2">
          <UserAvatarDropdown />
          <NotificationBell />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooterUI>
  );
}
