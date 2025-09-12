"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogTrigger } from "@/components/ui/dialog";
import { CreateTagInput, createTagSchema } from "../schemas/create-tag-schema";
import { UpdateTagInput, updateTagSchema } from "../schemas/update-tag-schema";
import { useCreateTagMutation } from "../mutations/use-create-tag-mutation";
import { useUpdateTagMutation } from "../mutations/use-update-tag-mutation";
import { Tag } from "@/types/tag";

type Props = {
  tag?: Tag;
  organizationId: string;
  onSuccess: () => void;
};

export function TagForm(props: Props) {
  const isUpdate = !!props.tag;

  const form = useForm<CreateTagInput | UpdateTagInput>({
    defaultValues: isUpdate
      ? {
          name: props.tag?.name,
          color: props.tag?.color,
        }
      : {
          name: "",
          color: "#000000",
          organizationId: props.organizationId,
        },
    resolver: zodResolver(isUpdate ? updateTagSchema : createTagSchema),
  });

  const { mutate: createTagMutation, isPending: isPendingCreate } = useCreateTagMutation();
  const { mutate: updateTagMutation, isPending: isPendingUpdate } = useUpdateTagMutation(props.tag?.id as string);

  function handleSubmit(data: CreateTagInput | UpdateTagInput) {
    if (isUpdate) {
      updateTagMutation(data as UpdateTagInput, {
        onSuccess() {
          props.onSuccess();
        },
      });
    } else {
      const input = { ...data, organizationId: props.organizationId };
      createTagMutation(input as CreateTagInput, {
        onSuccess() {
          form.reset();
          props.onSuccess();
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form id="tag-form" onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input type="color" className="h-10 w-16 cursor-pointer rounded p-1" {...field} />
                  <Input placeholder="#000000" className="flex-1" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button type="button" variant="outline" disabled={isPendingCreate || isPendingUpdate}>
              Cancelar
            </Button>
          </DialogTrigger>

          <Button type="submit" disabled={isPendingCreate || isPendingUpdate} className="min-w-20">
            {isUpdate ? "Salvar alterações" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
