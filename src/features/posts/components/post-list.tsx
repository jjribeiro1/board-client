"use client";
import { useRouter } from "next/navigation";
import { Tag, Calendar } from "lucide-react";
import { Card, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostStatusDropdown } from "./post-status-dropdown";
import { CreatePost } from "./create-post";
import { PinPost } from "./pin-post";
import { useOrganizationPosts } from "../../organizations/hooks/use-organization-posts";
import { useQueryParams } from "@/hooks/use-query-params";

type Props = {
  orgId: string;
};

export function PostList(props: Props) {
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

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="text-xl font-semibold">Posts</h1>
          <span className="text-xl font-bold">{`(${data?.length ?? 0})`}</span>
        </div>

        <CreatePost organizationId={props.orgId} />
      </div>
      {hasPosts ? (
        data.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-baseline gap-x-6">
                <CardTitle className="cursor-pointer" onClick={() => router.push(`/posts/${post.id}`)}>
                  {post.title}
                </CardTitle>
                <CardDescription>
                  <PostStatusDropdown post={post} orgId={props.orgId} />
                </CardDescription>
              </div>
              <PinPost post={post} />
            </CardHeader>
            <CardFooter className="justify-between">
              <div className="flex w-full items-center gap-6">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" /> <span>{post.board.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {post.tags.map(({ tag }) => (
                  <Badge key={tag.id} variant={"secondary"} className="text-nowrap">
                    {tag.name}
                  </Badge>
                ))}
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
      )}
    </section>
  );
}
