"use client";
import { DataTable } from "@/components/ui/data-table";
import { statusColumns } from "./status-columns";
import { useOrganizationStatus } from "@/hooks/use-organization-status";

type Props = {
  organizationId: string;
};

export function StatusDataTable(props: Props) {
  const { data: statusData, isPending, error } = useOrganizationStatus(props.organizationId);

  if (isPending) {
    return <div className="leading-none font-semibold tracking-tight">Carregando informações...</div>;
  }

  if (error) {
    return <div>Erro ao carregar status da sua organização</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable data={statusData} columns={statusColumns} />
    </div>
  );
}
