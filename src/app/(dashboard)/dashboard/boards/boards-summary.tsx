"use client";
import { useOrganizationBoards } from "@/features/organizations/hooks/use-organization-boards";

type Props = {
  orgId: string;
};

export function BoardsSummary(props: Props) {
  const { data: boards } = useOrganizationBoards(props.orgId);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Resumo</h2>
      <div className="flex w-full gap-6">
        <div className="flex min-w-3xs flex-col gap-2 rounded-md border p-4">
          <p className="text-lg font-semibold">{boards?.length}</p>
          <p className="text-secondary-foreground">Total de boards</p>
        </div>

        <div className="flex min-w-3xs flex-col gap-2 rounded-md border p-4">
          <p className="text-lg font-semibold">{boards?.reduce((acc, board) => acc + board._count.posts, 0)}</p>
          <p className="text-secondary-foreground">Total de posts</p>
        </div>
      </div>
    </div>
  );
}
