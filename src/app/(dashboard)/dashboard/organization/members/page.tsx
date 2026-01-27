import { OrganizationMembersDataTable } from "./_components/data-table/organization-members-data-table";
import { getOrganizationId } from "@/features/organizations/services/get-organization-id";
import { InviteMemberDialog } from "@/features/organizations/components/invite-member-dialog";

export default async function OrganizationMembersPage() {
  const orgId = await getOrganizationId();

  return (
    <section className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Gerenciar membros</h1>
        <InviteMemberDialog organizationId={orgId!} />
      </div>

      <OrganizationMembersDataTable organizationId={orgId!} />
    </section>
  );
}
