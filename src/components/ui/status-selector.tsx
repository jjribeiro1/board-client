import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormControl } from "@/components/ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Status } from "@/types/status";

type Props = {
  statuses: Status[] | undefined;
  value: string;
  onChange: (statusId: string) => void;
};

export function StatusSelector(props: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            size={"sm"}
            variant="outline"
            role="combobox"
            className={cn("w-[200px] justify-between", !props.value && "text-muted-foreground")}
          >
            {props.value ? props.statuses?.find((status) => status.id === props.value)?.name : "Selecionar status"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar status..." />
          <CommandList>
            <CommandEmpty>Nenhum status encontrado</CommandEmpty>
            <CommandGroup>
              {props.statuses?.map((status) => (
                <CommandItem
                  value={status.name}
                  key={status.id}
                  onSelect={() => props.onChange(status.id)}
                >
                  {status.name}
                  <Check className={cn("ml-auto", status.id === props.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
