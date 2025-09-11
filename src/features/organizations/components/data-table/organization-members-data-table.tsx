"use client";
import { DataTable } from "@/components/ui/data-table";
import { organizationMembersColumns } from "./organization-members-columns";
import { useOrganizationMembers } from "../../hooks/use-organization-members";

type Props = {
  organizationId: string;
};

export function OrganizationMembersDataTable(props: Props) {
  const { data, isPending, error } = useOrganizationMembers(props.organizationId);

  if (isPending) {
    return <div className="leading-none font-semibold tracking-tight">Carregando informações...</div>;
  }

  if (error) {
    return <div>Erro ao carregar membros da sua organização</div>;
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable data={data} columns={organizationMembersColumns} />
    </div>
  );
}
