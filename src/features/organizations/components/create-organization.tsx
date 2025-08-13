"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateOrganizationMutation } from "../mutations/use-create-organization-mutation";
import { CreateOrganizationInput, createOrganizationSchema } from "../schemas/create-organization-schema";

export function CreateOrganization() {
  const form = useForm<CreateOrganizationInput>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createOrganizationSchema),
  });

  const { mutate: createOrganizationMutation, isPending } = useCreateOrganizationMutation();

  function onSubmit(data: CreateOrganizationInput) {
    createOrganizationMutation(data);
  }

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da empresa / produto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Criar organização
        </Button>
      </form>
    </Form>
  );
}
