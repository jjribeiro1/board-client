import { OrganizationPosts } from "@/features/organizations/components/organization-posts";
import { getOrganizationId } from "@/features/organizations/services/get-organization-id";

export default async function DashboardPage() {
  const orgId = await getOrganizationId();
  return <OrganizationPosts orgId={orgId!} />;
}
