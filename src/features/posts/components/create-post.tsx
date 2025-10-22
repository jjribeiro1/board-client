import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { BoardSelector } from "@/components/ui/board-selector";
import { StatusSelector } from "@/components/ui/status-selector";
import {
  CreatePostInput,
  createPostUserSchema,
  createPostAdminSchema,
} from "../schemas/create-post-schema";
import { useOrganizationBoards } from "@/features/organizations/hooks/use-organization-boards";
import { useOrganizationTags } from "@/features/organizations/hooks/use-organization-tags";
import { useOrganizationStatus } from "@/hooks/use-organization-status";
import { useUserPermission } from "@/hooks/use-user-permission";
import { useCreatePostMutation } from "../mutations/use-create-post-mutation";

type Props = {
  organizationId: string;
  boardId?: string;
  title?: string;
};

export function CreatePost(props: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const { isAdminOrOwnerFromOrg } = useUserPermission(props.organizationId);

  const schema = isAdminOrOwnerFromOrg ? createPostAdminSchema : createPostUserSchema;

  const form = useForm<CreatePostInput>({
    defaultValues: isAdminOrOwnerFromOrg
      ? {
          boardId: props?.boardId || "",
          description: "",
          title: "",
          statusId: "",
          tagIds: [],
          isLocked: false,
          isPinned: false,
          isPrivate: false,
        }
      : {
          boardId: props.boardId || "",
          description: "",
          title: "",
        },
    resolver: zodResolver(schema),
  });

  const { data: boards } = useOrganizationBoards(props.organizationId);
  const { data: statuses } = useOrganizationStatus(props.organizationId);
  const { data: tags } = useOrganizationTags(props.organizationId);
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
      <DialogContent className="max-w-3xl">
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
            {isAdminOrOwnerFromOrg ? (
              <>
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
                <FormField
                  control={form.control}
                  name="tagIds"
                  render={({ field }) => (
                    <FormItem className="w-[60%]">
                      <FormLabel className="text-sm">Tags</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={tags?.map((t) => ({ value: t.id, label: t.name })) || []}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Selecionar tags"
                          responsive={true}
                          maxCount={2}
                          modalPopover={true}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            ) : null}
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
