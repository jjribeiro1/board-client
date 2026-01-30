"use client";

import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { BoardsGroup } from "./boards-group";
import { StatusGroup } from "./status-group";

export function OrganizationSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <SidebarProvider className="min-h-0 flex-1">
        <Sidebar className="h-full border-r" collapsible="none">
          <SidebarContent>
            <BoardsGroup />
            <StatusGroup />
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-auto px-8 py-6">{children}</main>
      </SidebarProvider>
    </div>
  );
}
