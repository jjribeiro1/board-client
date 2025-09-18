"use client";
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { useOrganizationTags } from "@/features/organizations/hooks/use-organization-tags";
import { Post } from "@/types/post";
import { useUpdatePostTagsMutation } from "../mutations/use-update-post-tags.mutation";

type Props = {
  post: Post;
  orgId: string;
  onPostUpdate: () => void;
};

export function UpdatePostTags(props: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { data: tags } = useOrganizationTags(props.orgId);
  const { mutate: updatePostTagsMutation, isPending } = useUpdatePostTagsMutation(props.post.id);

  function onSubmit() {
    updatePostTagsMutation(
      { tagIds: selectedTags },
      {
        onSuccess() {
          props.onPostUpdate();
        },
      },
    );
  }

  return (
    <div className="flex w-full items-center gap-2">
      <MultiSelect
        className="p-0"
        value={selectedTags}
        onValueChange={setSelectedTags}
        options={tags?.map((tag) => ({ value: tag.id, label: tag.name })) ?? []}
        defaultValue={props.post.tags.map((tag) => tag.id)}
        placeholder="Selecionar tags"
        maxCount={1}
      />

      <Button size={"sm"} className="text-xs" disabled={isPending} onClick={onSubmit}>
        Salvar
      </Button>
    </div>
  );
}
