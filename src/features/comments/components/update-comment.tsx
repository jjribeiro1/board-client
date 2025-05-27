"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UpdateCommentInput, updateCommentSchema } from "../schemas/update-comment-schema";
import { Comment } from "@/types/comment";
import { useUpdateCommentMutation } from "../mutations/use-update-comment-mutation";

type Props = {
  comment: Comment;
  onCommentUpdate: () => void;
};

export function UpdateComment(props: Props) {
  const form = useForm<UpdateCommentInput>({
    defaultValues: {
      content: props.comment.content,
    },
    resolver: zodResolver(updateCommentSchema),
  });
  const { mutate } = useUpdateCommentMutation(props.comment.id);
  const commentLengthLimit = 1000;

  function onSubmit(data: UpdateCommentInput) {
    mutate(data, {
      onSuccess() {
        form.reset();
        props.onCommentUpdate();
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
                <Textarea placeholder="Escreva seu comentário" className="resize-none" rows={6} {...field} />
              </FormControl>
              <div className="flex w-full justify-between">
                <FormDescription
                  className={`${field.value.length > commentLengthLimit ? "text-red-500" : "text-inherit"}`}
                >
                  {`${field.value.length}/${commentLengthLimit}`}
                </FormDescription>

                <Button type="submit" variant={"secondary"} size={"sm"}>
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
