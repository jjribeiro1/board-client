"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updatePostSchema, UpdatePostInput } from "../schemas/update-post-schema";
import { Post } from "@/types/post";
import { useUpdatePostMutation } from "../mutations/use-update-post-mutation";

type Props = {
  onPostUpdate: () => void;
  post: Post;
};

export function UpdatePost(props: Props) {
  const { mutate: updatePostMutation, isPending } = useUpdatePostMutation(props.post.id);

  const form = useForm<UpdatePostInput>({
    defaultValues: {
      title: props.post.title,
      description: props.post.description,
    },
    resolver: zodResolver(updatePostSchema),
  });

  function onSubmit(data: UpdatePostInput) {
    updatePostMutation(data, {
      onSuccess: () => {
        props.onPostUpdate();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Título do post"
                  {...field}
                  className="text-lg leading-none font-semibold tracking-tight"
                />
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

        <Button type="submit" disabled={isPending} className="w-max self-end">
          Salvar alterações
        </Button>
      </form>
    </Form>
  );
}
