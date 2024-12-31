"use client";
import { Tag, Calendar } from "lucide-react";
import {
  Card,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostStatusDropdown } from "./post-status-dropdown";
import { useOrganizationPosts } from "../../organizations/hooks/use-organization-posts";

type Props = {
  orgId: string;
};

export function PostList(props: Props) {
  const { data } = useOrganizationPosts(props.orgId);

  return (
    <section className="flex flex-col gap-4">
      {data?.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              <PostStatusDropdown post={post} />
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
                <Badge
                  key={tag.id}
                  variant={"secondary"}
                  className="text-nowrap"
                >
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
