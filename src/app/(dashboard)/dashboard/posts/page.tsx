import { getOrganizationId } from "@/features/organizations/services/get-organization-id";
import { PostsPageHeader } from "./posts-page-header";
import { PostsList } from "./posts-list";

export default async function DashboardPage() {
  const orgId = await getOrganizationId();
  return (
    <section className="flex w-full flex-col gap-6">
      <PostsPageHeader orgId={orgId!} />
      <PostsList orgId={orgId!} />
    </section>
  );
}
