import { OrganizationInvitesDataTable } from "./_components/data-table/organization-invites-data-table";
import { getOrganizationId } from "@/features/organizations/services/get-organization-id";

export default async function OrganizationInvitesPage() {
  const orgId = await getOrganizationId();

  return (
    <section className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Gerenciar convites</h1>
      </div>

      <OrganizationInvitesDataTable organizationId={orgId!} />
    </section>
  );
}
