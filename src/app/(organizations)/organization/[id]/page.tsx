"use client";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrganizationBoards } from "@/features/organizations/hooks/use-organization-boards";

export default function PublicOrganizationPage() {
  const params = useParams<{ id: string }>();
  const { data: boards, isPending, error } = useOrganizationBoards(params.id);

  if (isPending) {
    return <div>Carregando informações...</div>;
  }

  if (error) {
    return <div>Erro ao buscar dados da organização</div>;
  }

  return (
    <main>
      <Tabs defaultValue={boards[0].id}>
        <TabsList className="bg-sidebar text-sidebar-foreground w-full gap-x-6 rounded-none">
          {boards.map((board) => (
            <TabsTrigger key={board.id} value={board.id}>
              {board.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {boards.map((board) => (
          <TabsContent key={board.id} value={board.id}>
            {board.title}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
