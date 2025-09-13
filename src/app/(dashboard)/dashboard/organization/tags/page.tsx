import { getOrganizationId } from "@/features/organizations/services/get-organization-id";
import { TagsDataTable } from "./_components/data-table/tags-data-table";
import { CreateTagDialog } from "./_components/create-tag";

export default async function OrganizationTagsPage() {
  const orgId = await getOrganizationId();

  return (
    <section className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Gerenciar tags</h1>
        <CreateTagDialog organizationId={orgId!} />
      </div>

      <TagsDataTable organizationId={orgId!} />
    </section>
  );
}
