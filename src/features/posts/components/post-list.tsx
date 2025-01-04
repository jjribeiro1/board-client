"use client";
import { Tag, Calendar } from "lucide-react";
import { Card, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostStatusDropdown } from "./post-status-dropdown";
import { useOrganizationPosts } from "../../organizations/hooks/use-organization-posts";
import { useQueryParams } from "@/hooks/use-query-params";

type Props = {
  orgId: string;
};

export function PostList(props: Props) {
  const { getQueryParam } = useQueryParams();
  const { data } = useOrganizationPosts({
    orgId: props.orgId,
    filters: {
      status: getQueryParam("status") as string,
      board: getQueryParam("board") as string,
    },
  });

  return (
    <section className="flex flex-col gap-4">
      {data?.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              <PostStatusDropdown post={post} orgId={props.orgId} />
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-between">
            <div className="flex items-center gap-6 w-full">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" /> <span>{post.board.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
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
      ))}
    </section>
  );
}
