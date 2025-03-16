import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Board } from "@/types/board";

type Props = {
  boards: Board[] | undefined;
  value: string;
  onChange: (boardId: string) => void;
};

export function BoardSelector(props: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          variant="outline"
          role="combobox"
          className={cn("w-[200px] justify-between", !props.value && "text-muted-foreground")}
        >
          {props.value ? props.boards?.find((board) => board.id === props.value)?.title : "Selecionar board"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar board..." />
          <CommandList>
            <CommandEmpty>Nenhum board encontrado</CommandEmpty>
            <CommandGroup>
              {props.boards?.map((board) => (
                <CommandItem value={board.title} key={board.id} onSelect={() => props.onChange(board.id)}>
                  {board.title}
                  <Check className={cn("ml-auto", board.id === props.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
