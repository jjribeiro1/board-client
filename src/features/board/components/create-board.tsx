"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateBoardInput, createBoardSchema } from "../schemas/create-board-schema";
import { useCreateBoardMutation } from "../mutations/use-create-board-mutation";

type Props = {
  orgId: string;
};

export function CreateBoard(props: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<CreateBoardInput>({
    defaultValues: {
      title: "",
      description: "",
      organizationId: props.orgId,
    },
    resolver: zodResolver(createBoardSchema),
  });

  const { mutate: createBoardMutation, isPending } = useCreateBoardMutation();

  function onSubmit(data: CreateBoardInput) {
    createBoardMutation(data, {
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
        <Button variant={"secondary"} size={"sm"}>
          <Plus />
          Novo Board
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-(--breakpoint-md)">
        <DialogHeader>
          <DialogTitle>Novo Board</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form id="create-board" onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
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
          </form>
        </Form>
        <DialogFooter>
          <Button form="create-board" disabled={isPending} className="min-w-20">
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
