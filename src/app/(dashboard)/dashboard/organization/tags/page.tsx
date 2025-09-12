import { getOrganizationId } from "@/features/organizations/services/get-organization-id";
import { CreateTag } from "@/features/tags/components/create-tag";
import { TagsDataTable } from "@/features/tags/components/data-table/tags-data-table";

export default async function OrganizationTagsPage() {
  const orgId = await getOrganizationId();

  return (
    <section className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Gerenciar tags</h1>
        <CreateTag organizationId={orgId!} />
      </div>

      <TagsDataTable organizationId={orgId!} />
    </section>
  );
}
