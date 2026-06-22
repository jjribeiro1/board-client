"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogTrigger } from "@/components/ui/dialog";
import { createRoadmapSchema, type CreateRoadmapInput } from "@/features/roadmaps/schemas/create-roadmap-schema";
import { useCreateRoadmapMutation } from "@/features/roadmaps/mutations/use-create-roadmap-mutation";

type RoadmapFormProps = {
  organizationId: string;
  onSuccess: () => void;
};

export function RoadmapForm({ organizationId, onSuccess }: RoadmapFormProps) {
  const form = useForm<CreateRoadmapInput>({
    defaultValues: {
      name: "",
      description: "",
      organizationId,
    },
    resolver: zodResolver(createRoadmapSchema),
  });

  const { mutate: createRoadmap, isPending } = useCreateRoadmapMutation();

  function handleSubmit(data: CreateRoadmapInput) {
    createRoadmap(data, {
      onSuccess() {
        form.reset();
        onSuccess();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full flex-col gap-6">
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Descrição (opcional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button type="button" variant="outline" disabled={isPending}>
              Cancelar
            </Button>
          </DialogTrigger>

          <Button type="submit" disabled={isPending} className="min-w-20">
            Criar
          </Button>
        </div>
      </form>
    </Form>
  );
}
