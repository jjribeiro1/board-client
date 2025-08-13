"use client"
import { useRouter } from "next/navigation";
import { MessageCircleMore, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreatePost } from "@/features/posts/components/create-post";
import { PostStatusDropdown } from "@/features/posts/components/post-status-dropdown";
import { PinPost } from "@/features/posts/components/pin-post";
import { useOrganizationPosts } from "@/features/organizations/hooks/use-organization-posts";
import { useQueryParams } from "@/hooks/use-query-params";
import dayjs from "@/lib/dayjs";

type Props = {
  orgId: string;
};

export function PostsList(props: Props) {
  const router = useRouter();
  const { getQueryParam } = useQueryParams();
  const { data, isPending, error } = useOrganizationPosts({
    orgId: props.orgId,
    filters: {
      status: getQueryParam("status") as string,
      board: getQueryParam("board") as string,
    },
  });

  if (isPending) {
    return <div className="leading-none font-semibold tracking-tight">Carregando posts...</div>;
  }

  if (error) {
    return <div>Erro ao carregar posts da sua organização</div>;
  }

  const hasPosts = data.length > 0;

  return hasPosts ? (
    data.map((post) => (
      <Card key={post.id}>
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-baseline gap-x-4">
              <CardTitle className="cursor-pointer" onClick={() => router.push(`/posts/${post.id}`)}>
                {post.title}
              </CardTitle>
              <PostStatusDropdown post={post} orgId={props.orgId} />
            </div>

            <CardDescription>{post.description}</CardDescription>
          </div>
          <PinPost post={post} />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {post.tags.map(({ tag }) => (
              <Badge key={tag.id} variant={"secondary"} className="text-nowrap">
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <div className="flex items-center gap-x-3">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" /> <span>{post.board.title}</span>
            </div>
            <p className="text-muted-foreground">{`- ${dayjs(post.createdAt).fromNow()}`}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <MessageCircleMore className="size-4" />
            <span className="text-sm">{post._count.comments}</span>
          </div>
        </CardFooter>
      </Card>
    ))
  ) : (
    <div className="flex h-96 flex-col items-center justify-center gap-y-8">
      <div>
        <p className="text-2xl font-semibold tracking-tight">Parece que você não tem nenhum post criado</p>
        <p className="text-muted-foreground font-medium">
          Aqui você consegue gerenciar todos os Posts da sua organização
        </p>
      </div>
      <CreatePost organizationId={props.orgId} title="Criar primeiro post" />
    </div>
  );
}
