import { PublicOrganizationHeader } from "@/features/organizations/components/public-organization-header";

export default function PublicOrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicOrganizationHeader />
      {children}
    </>
  );
}
