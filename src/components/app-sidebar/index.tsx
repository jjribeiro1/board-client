import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import { StatusGroup } from "./status-group";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <p className="text-xl font-semibold tracking-tight text-center">
          Organization
        </p>
      </SidebarHeader>
      <SidebarContent>
        <StatusGroup />
      </SidebarContent>
    </Sidebar>
  );
}
