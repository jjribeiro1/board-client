import { getOrganizationId } from "@/features/organizations/services/get-organization-id";
import { BoardsSummary } from "./boards-summary";
import { BoardsList } from "./boards-list";

export default async function DashboardBoardsPage() {
  const orgId = await getOrganizationId();

  return (
    <section className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-bold">Gerenciar boards</h1>

      <div className="flex flex-col gap-12">
        <BoardsSummary orgId={orgId!} />
        <BoardsList orgId={orgId!} />
      </div>
    </section>
  );
}
