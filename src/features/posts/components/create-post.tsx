import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BoardSelector } from "@/components/ui/board-selector";
import { StatusSelector } from "@/components/ui/status-selector";
import { CreatePostInput, createPostSchema } from "../schemas/create-post-schema";
import { useOrganizationBoards } from "@/features/organizations/hooks/use-organization-boards";
import { useOrganizationStatus } from "@/hooks/use-organization-status";
import { useCreatePostMutation } from "../mutations/use-create-post-mutation";

type Props = {
  organizationId: string;
  title?: string;
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
  const { data: statuses } = useOrganizationStatus();
  const { mutate: createPostMutation, isPending } = useCreatePostMutation();

  function onSubmit(values: CreatePostInput) {
    createPostMutation(values, {
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
          {props.title || "Novo Post"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-(--breakpoint-md)">
        <DialogHeader>
          <DialogTitle>Novo Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="create-post" onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
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
                    <BoardSelector
                      boards={boards}
                      value={field.value}
                      onChange={(boardId) => form.setValue("boardId", boardId)}
                    />
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
                    <StatusSelector
                      statuses={statuses}
                      value={field.value}
                      onChange={(statusId) => form.setValue("statusId", statusId)}
                    />
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
