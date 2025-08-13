"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CreateCommentInput, createCommentSchema } from "../schemas/create-comment-schema";
import { useCreateCommentMutation } from "../mutations/use-create-comment-mutation";
import { Post } from "@/types/post";

type Props = {
  post: Post;
};

export function CreateComment(props: Props) {
  const form = useForm<CreateCommentInput>({
    defaultValues: {
      content: "",
      postId: props.post.id,
    },
    resolver: zodResolver(createCommentSchema),
  });
  const { mutate: createCommentMutation } = useCreateCommentMutation();

  const commentLengthLimit = 1000;

  function onSubmit(data: CreateCommentInput) {
    createCommentMutation(data, {
      onSuccess() {
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={props.post.isLocked ? "Comentários desabilitados" : "Escreva um comentário..."}
                  className="resize-none"
                  rows={7}
                  {...field}
                  disabled={props.post.isLocked}
                />
              </FormControl>
              <div className="flex w-full justify-between">
                <FormDescription
                  className={`${field.value.length > commentLengthLimit ? "text-red-500" : "text-inherit"}`}
                >
                  {`${field.value.length}/${commentLengthLimit}`}
                </FormDescription>

                <Button type="submit" variant={"secondary"} size={"sm"} disabled={props.post.isLocked}>
                  <SendHorizonal />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
