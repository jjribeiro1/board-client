import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateStatusInput, createStatusSchema } from "@/features/status/schemas/create-status-schema";
import { UpdateStatusInput, updateStatusSchema } from "@/features/status/schemas/update-status-schema";
import { useCreateStatusMutation } from "@/features/status/mutations/use-create-status-mutation";
import { useUpdateStatusMutation } from "@/features/status/mutations/use-update-status-mutation";
import { Status } from "@/types/status";

type Props = {
  status?: Status;
  organizationId: string;
  onSuccess: () => void;
};

export function StatusForm(props: Props) {
  const isUpdate = !!props.status;

  const form = useForm<CreateStatusInput | UpdateStatusInput>({
    defaultValues: isUpdate
      ? {
          name: props.status?.name,
          color: props.status?.color,
          organizationId: props.organizationId,
        }
      : {
          name: "",
          color: "#000000",
          organizationId: props.organizationId,
        },
    resolver: zodResolver(isUpdate ? updateStatusSchema : createStatusSchema),
  });

  const { mutate: createStatusMutation, isPending: isPendingCreate } = useCreateStatusMutation();
  const { mutate: updateStatusMutation, isPending: isPendingUpdate } = useUpdateStatusMutation(
    props.status?.id as string,
  );

  function handleSubmit(data: CreateStatusInput | UpdateStatusInput) {
    if (isUpdate) {
      updateStatusMutation(data as UpdateStatusInput, {
        onSuccess() {
          props.onSuccess();
        },
      });
    } else {
      createStatusMutation(data as CreateStatusInput, {
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
