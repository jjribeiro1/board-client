"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  UpdateMemberRoleInput,
  updateMemberRoleSchema,
} from "@/features/organizations/schemas/update-member-role-schema";
import { useUpdateMemberRoleMutation } from "@/features/organizations/mutations/use-update-member-role-mutation";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
  userId: string;
  currentRole: "ADMIN" | "MEMBER" | "OWNER";
  memberName: string;
};

const roleOptions = [
  { label: "Administrador", value: "ADMIN" },
  { label: "Membro", value: "MEMBER" },
];

export function UpdateMemberRoleDialog(props: Props) {
  const form = useForm<UpdateMemberRoleInput>({
    resolver: zodResolver(updateMemberRoleSchema),
  });

  const { mutate: updateRoleMutation, isPending } = useUpdateMemberRoleMutation({
    organizationId: props.organizationId,
    userId: props.userId,
  });

  function handleSubmit(data: UpdateMemberRoleInput) {
    updateRoleMutation(data, {
      onSuccess: () => {
        props.onOpenChange(false);
      },
    });
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar permissão de {props.memberName}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Permissão</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Selecione uma permissão" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0" disabled defaultValue={"0"}>
                        Selecione
                      </SelectItem>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="hover:bg-muted cursor-pointer">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => props.onOpenChange(false)} disabled={isPending}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
