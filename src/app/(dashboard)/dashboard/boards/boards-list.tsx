"use client";
import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BoardActions } from "@/features/board/components/board-actions";
import { useOrganizationBoards } from "@/features/organizations/hooks/use-organization-boards";
import dayjs from "@/lib/dayjs";

type Props = {
  orgId: string;
};

export function BoardsList(props: Props) {
  const { data: boards } = useOrganizationBoards(props.orgId);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Boards</h2>

      <div>
        {boards?.map((board) => (
          <Card key={board.id}>
            <CardHeader className="flex w-full flex-row justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle>{board.title}</CardTitle>
                <CardDescription>{board.description}</CardDescription>
              </div>

              <BoardActions board={board} />
            </CardHeader>
            <CardContent className="flex gap-6">
              <div className="flex items-center gap-2">
                <MessageSquare />
                {`${board._count.posts} posts`}
              </div>

              <div className="flex items-center gap-2">
                <span>{`Atualizado ${dayjs(board.updatedAt).fromNow()}`}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
