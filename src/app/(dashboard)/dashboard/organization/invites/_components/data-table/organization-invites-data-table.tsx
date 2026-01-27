"use client";
import { DataTable } from "@/components/ui/data-table";
import { organizationInvitesColumns } from "./organization-invites-columns";
import { useOrganizationInvites } from "@/features/organizations/hooks/use-organization-invites";

type Props = {
  organizationId: string;
};

export function OrganizationInvitesDataTable(props: Props) {
  const { data, isPending, error } = useOrganizationInvites(props.organizationId);

  if (isPending) {
    return <div className="leading-none font-semibold tracking-tight">Carregando informações...</div>;
  }

  if (error) {
    return <div>Erro ao carregar convites da sua organização</div>;
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable data={data} columns={organizationInvitesColumns} />
    </div>
  );
}
