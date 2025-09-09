"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useManageBoardSettings } from "../mutations/use-manage-board-settings-mutation";
import { UpdateBoardInput, updateBoardSchema } from "../schemas/update-board-schema";
import { Board } from "@/types/board";

type Props = {
  board: Board;
};

export function UpdateBoard(props: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<UpdateBoardInput>({
    defaultValues: {
      title: props.board.title,
      description: props.board.description,
      isLocked: props.board.isLocked,
    },
    resolver: zodResolver(updateBoardSchema),
  });

  const { mutate: manageBoardMutation, isPending } = useManageBoardSettings(props.board.id);

  function onSubmit(data: UpdateBoardInput) {
    manageBoardMutation(data, {
      onSuccess: () => {
        setOpenDialog(false);
        form.reset();
      },
    });
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
        <div className="hover:bg-secondary focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
          <Pencil />
          Editar board
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-(--breakpoint-md)">
        <DialogHeader>
          <DialogTitle>Editar Board</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form id="update-board" onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Título do board" {...field} />
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
                    <Textarea placeholder="Descrição do board" className="resize-none" rows={7} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isLocked"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Bloquear board</FormLabel>
                    <FormDescription>{"Novas postagens estarão bloqueadas"}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={() => setOpenDialog(false)} variant="outline" disabled={isPending}>
            Cancelar
          </Button>
          <Button form="update-board" disabled={isPending}>
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
