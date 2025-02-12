"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CreateCommentInput, createCommentSchema } from "../schemas/create-comment-schema";
import { useCreateCommentMutation } from "../mutations/use-create-comment-mutation";

type Props = {
  postId: string;
};

export function CreateComment(props: Props) {
  const form = useForm<CreateCommentInput>({
    defaultValues: {
      content: "",
      postId: props.postId,
    },
    resolver: zodResolver(createCommentSchema),
  });
  const { mutate } = useCreateCommentMutation();

  const commentLengthLimit = 1000;

  function onSubmit(data: CreateCommentInput) {
    mutate(data);
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
                <Textarea placeholder="Escreva seu comentário" className="resize-none" rows={7} {...field} />
              </FormControl>
              <div className="flex justify-between w-full">
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
