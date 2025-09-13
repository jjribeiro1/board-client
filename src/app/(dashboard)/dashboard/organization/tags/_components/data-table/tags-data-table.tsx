"use client";

import { DataTable } from "@/components/ui/data-table";
import { tagsColumns } from "./tags-columns";
import { useOrganizationTags } from "@/features/organizations/hooks/use-organization-tags";

export function TagsDataTable(props: { organizationId: string }) {
  const { data, isPending, error } = useOrganizationTags(props.organizationId);

  if (isPending) {
    return <div className="leading-none font-semibold tracking-tight">Carregando informações...</div>;
  }

  if (error) {
    return <div>Erro ao carregar tags da sua organização</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable data={data} columns={tagsColumns} />
    </div>
  );
}
