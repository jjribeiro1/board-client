import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { StatusGroup } from "./status-group";
import { SidebarHeader } from "./header";
import { BoardGroup } from "./board-group";
import { getOrganizationId } from "@/features/organizations/services/get-organization-id";

export async function AppSidebar() {
  const orgId = await getOrganizationId();

  return (
    <Sidebar>
      <div className="py-6">
        <SidebarHeader organizationId={orgId!} />
        <SidebarContent>
          <StatusGroup />
          <BoardGroup organizationId={orgId!} />
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
