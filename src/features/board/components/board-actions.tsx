import { Ellipsis, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateBoard } from "./update-board";
import { DeleteBoard } from "./delete-board";
import { Board } from "@/types/board";
import Link from "next/link";

type Props = {
  board: Board;
};

export function BoardActions(props: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Ellipsis className="text-muted-foreground h-3 w-3 cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/posts?board=${props.board.id}`}
            target="_blank"
            className="flex cursor-pointer items-center gap-2"
          >
            <Eye /> Ver posts
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <UpdateBoard board={props.board} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteBoard boardId={props.board.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
