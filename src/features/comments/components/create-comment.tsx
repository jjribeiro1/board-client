"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal, X } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CreateCommentInput, createCommentSchema } from "../schemas/create-comment-schema";
import { useCreateCommentMutation } from "../mutations/use-create-comment-mutation";
import { Post } from "@/types/post";

type Props = {
  post: Post;
  parentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function CreateComment(props: Props) {
  const form = useForm<CreateCommentInput>({
    defaultValues: {
      content: "",
      postId: props.post.id,
      parentId: props.parentId ?? null,
    },
    resolver: zodResolver(createCommentSchema),
  });
  const { mutate: createCommentMutation } = useCreateCommentMutation();

  const commentLengthLimit = 1000;
  const isReply = !!props.parentId;

  function onSubmit(data: CreateCommentInput) {
    createCommentMutation(data, {
      onSuccess() {
        form.reset();
        props.onSuccess?.();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={
                    props.post.isLocked
                      ? "Comentários desabilitados"
                      : isReply
                        ? "Escreva uma resposta..."
                        : "Escreva um comentário..."
                  }
                  className="resize-none"
                  rows={isReply ? 3 : 7}
                  {...field}
                  disabled={props.post.isLocked}
                />
              </FormControl>
              <div className="flex w-full items-center justify-between">
                <FormDescription
                  className={`${field.value.length > commentLengthLimit ? "text-red-500" : "text-inherit"}`}
                >
                  {`${field.value.length}/${commentLengthLimit}`}
                </FormDescription>
                <div className="flex gap-x-2">
                  {isReply && props.onCancel && (
                    <Button type="button" variant={"ghost"} size={"sm"} onClick={props.onCancel}>
                      <X />
                    </Button>
                  )}
                  <Button type="submit" variant={"secondary"} size={"sm"} disabled={props.post.isLocked}>
                    <SendHorizonal />
                  </Button>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
