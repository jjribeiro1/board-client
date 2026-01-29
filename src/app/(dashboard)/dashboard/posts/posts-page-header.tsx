"use client";
import { CreatePost } from "@/features/posts/components/create-post";
import { useOrganizationPosts } from "@/features/organizations/hooks/use-organization-posts";
import { useQueryParams } from "@/hooks/use-query-params";
import { useUserPermission } from "@/hooks/use-user-permission";

type Props = {
  orgId: string;
};

export function PostsPageHeader(props: Props) {
  const { getQueryParam } = useQueryParams();
  const {
    data: posts,
    isPending,
    error,
  } = useOrganizationPosts({
    orgId: props.orgId,
    filters: {
      status: getQueryParam("status") as string,
      board: getQueryParam("board") as string,
    },
  });

  const { isAdminOrOwnerFromOrg } = useUserPermission(props.orgId);

  if (isPending) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>erro ao buscar informações</div>;
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <h1 className="text-xl font-semibold">Posts</h1>
        <span className="text-xl font-bold">{`(${posts.length ?? 0})`}</span>
      </div>

      {isAdminOrOwnerFromOrg ? <CreatePost organizationId={props.orgId} /> : null}
    </div>
  );
}
