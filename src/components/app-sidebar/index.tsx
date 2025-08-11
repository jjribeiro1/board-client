import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { SidebarHeader } from "./header";
import { FiltersGroup } from "./filters-group";
import { SidebarFooter } from "./footer";
import { getOrganizationId } from "@/features/organizations/services/get-organization-id";
import { NavigationGroup } from "./navigation-group";

export async function AppSidebar() {
  const orgId = await getOrganizationId();

  return (
    <Sidebar>
      <SidebarHeader organizationId={orgId!} />
      <SidebarContent>
        <FiltersGroup organizationId={orgId!} />
        <NavigationGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
