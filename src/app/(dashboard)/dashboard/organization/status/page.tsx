import { getOrganizationId } from "@/features/organizations/services/get-organization-id";
import { StatusDataTable } from "./_components/data-table/status-data-table";
import { CreateStatusDialog } from "./_components/create-status";

export default async function OrganizationStatusPage() {
  const orgId = await getOrganizationId();

  return (
    <section className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Gerenciar status</h1>
        <CreateStatusDialog organizationId={orgId!} />
      </div>

      <StatusDataTable organizationId={orgId!} />
    </section>
  );
}
