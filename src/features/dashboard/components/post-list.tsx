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
import { Button } from "@/components/ui/button";
import { usePostsFromOrganization } from "../hooks/use-posts-from-organization";

type Props = {
  orgId: string;
};

const statusColors: { [key in number]: string } = {
  1: "bg-primary-foreground text-white hover:bg-primary-foreground/85",
  2: "bg-purple-500 text-white hover:bg-purple-500/85",
  3: "bg-yellow-500 text-white hover:bg-yellow-500/85",
  4: "bg-blue-500 text-white hover:bg-blue-500/85",
  5: "bg-green-500 text-white hover:bg-green-500/85",
  6: "bg-red-500 text-white hover:bg-red-500/85",
};

export function PostList(props: Props) {
  const { data } = usePostsFromOrganization(props.orgId);
  return (
    <section className="flex flex-col gap-4">
      {data?.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              <Button
                size={"sm"}
                className={`${statusColors[post.status.order]}`}
              >
                {post.status.name}
              </Button>
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
