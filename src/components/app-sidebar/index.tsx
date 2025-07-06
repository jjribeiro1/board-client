import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { StatusGroup } from "./status-group";
import { SidebarHeader } from "./header";
import { BoardGroup } from "./board-group";
import { getOrganizationId } from "@/features/organizations/services/get-organization-id";
import { SidebarFooter } from "./footer";

export async function AppSidebar() {
  const orgId = await getOrganizationId();

  return (
    <Sidebar>
      <SidebarHeader organizationId={orgId!} />
      <SidebarContent>
        <StatusGroup />
        <BoardGroup organizationId={orgId!} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
