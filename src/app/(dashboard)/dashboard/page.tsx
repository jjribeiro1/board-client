import { PostList } from "@/features/dashboard/components/post-list";
import { getOrganizationId } from "@/features/organizations/services/get-organization-id";

export default async function DashboardPage() {
  const orgId = await getOrganizationId();
  return <PostList orgId={orgId!} />;
}
