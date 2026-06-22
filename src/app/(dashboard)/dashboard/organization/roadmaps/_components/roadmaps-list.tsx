"use client";

import { useOrganizationRoadmaps } from "@/features/roadmaps/hooks/use-organization-roadmaps";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Props = {
  organizationId: string;
};

export function RoadmapsList({ organizationId }: Props) {
  const { data: roadmaps, isLoading } = useOrganizationRoadmaps(organizationId);

  if (isLoading) {
    return <p className="text-muted-foreground mt-4">Carregando...</p>;
  }

  if (!roadmaps?.length) {
    return <p className="text-muted-foreground mt-4">Nenhum roadmap encontrado.</p>;
  }

  return (
    <Accordion type="multiple" className="mt-4 w-full">
      {roadmaps.map((roadmap) => (
        <AccordionItem key={roadmap.id} value={roadmap.id}>
          <AccordionTrigger>{roadmap.name}</AccordionTrigger>
          <AccordionContent>
            {roadmap.description && <p className="text-muted-foreground mb-4">{roadmap.description}</p>}
            <div className="space-y-3">
              {roadmap.columns.map((column) => (
                <div key={column.id} className="flex items-center gap-2">
                  <div className="size-3 shrink-0 rounded-full" style={{ backgroundColor: column.color }} />
                  <span className="font-medium">{column.name}</span>
                  <span className="text-muted-foreground text-sm">
                    ({column.items.length} {column.items.length === 1 ? "item" : "itens"})
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
