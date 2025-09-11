import { OrganizationMembersList } from "./members-list";
import { getOrganizationId } from "@/features/organizations/services/get-organization-id";

export default async function OrganizationMembersPage() {
  const orgId = await getOrganizationId();

  return (
    <section className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Gerenciar membros</h1>
      </div>

      <OrganizationMembersList organizationId={orgId!} />
    </section>
  );
}
