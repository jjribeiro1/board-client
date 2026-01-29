import { PublicOrganizationHeader } from "@/features/organizations/components/public-organization-header";
import { OrganizationSidebar } from "./_components/org-sidebar";

export default function PublicOrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-sidebar flex h-screen flex-col">
      <PublicOrganizationHeader />
      <OrganizationSidebar>{children}</OrganizationSidebar>
    </div>
  );
}
