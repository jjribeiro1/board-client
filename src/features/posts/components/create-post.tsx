import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Plus, Check, ChevronsUpDown } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CreatePostInput, createPostSchema } from "../schemas/create-post-schema";
import { Textarea } from "@/components/ui/textarea";
import { useOrganizationBoards } from "@/features/organizations/hooks/use-organization-boards";
import { useSystemDefaultStatus } from "@/hooks/use-system-default-status";
import { useCreatePostMutation } from "../mutations/use-create-post-mutation";

type Props = {
  organizationId: string;
};

export function CreatePost(props: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<CreatePostInput>({
    defaultValues: {
      boardId: "",
      description: "",
      isLocked: false,
      isPinned: false,
      isPrivate: false,
      statusId: "",
      title: "",
    },
    resolver: zodResolver(createPostSchema),
  });

  const { data: boards } = useOrganizationBoards(props.organizationId);
  const { data: statuses } = useSystemDefaultStatus();
  const { mutate, isPending } = useCreatePostMutation();

  function onSubmit(values: CreatePostInput) {
    mutate(values);
    setOpenDialog(false);
  }

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        form.reset();
        setOpenDialog(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"secondary"} size={"sm"}>
          <Plus />
          Novo Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Novo Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="create-post" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Título do post" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Descrição do post" className="resize-none" rows={7} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="boardId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm">Board</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            size={"sm"}
                            variant="outline"
                            role="combobox"
                            className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value
                              ? boards?.find((board) => board.id === field.value)?.title
                              : "Selecionar board"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Buscar board..." />
                          <CommandList>
                            <CommandEmpty>Nenhum board encontrado</CommandEmpty>
                            <CommandGroup>
                              {boards?.map((board) => (
                                <CommandItem
                                  value={board.id}
                                  key={board.id}
                                  onSelect={() => {
                                    form.setValue("boardId", board.id);
                                  }}
                                >
                                  {board.title}
                                  <Check
                                    className={cn("ml-auto", board.id === field.value ? "opacity-100" : "opacity-0")}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="statusId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm">Status</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            size={"sm"}
                            variant="outline"
                            role="combobox"
                            className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value
                              ? statuses?.find((status) => status.id === field.value)?.name
                              : "Selecionar status"}
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
                              {statuses?.map((status) => (
                                <CommandItem
                                  value={status.id}
                                  key={status.id}
                                  onSelect={() => {
                                    form.setValue("statusId", status.id);
                                  }}
                                >
                                  {status.name}
                                  <Check
                                    className={cn("ml-auto", status.id === field.value ? "opacity-100" : "opacity-0")}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button form="create-post" disabled={isPending} className="min-w-20">
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
