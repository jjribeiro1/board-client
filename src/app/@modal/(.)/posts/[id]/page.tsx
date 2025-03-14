import { Modal } from "@/components/ui/modal";
import { getOrganizationId } from "@/features/organizations/services/get-organization-id";
import { PostDetails } from "@/features/posts/components/post-details";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailsModal(props: Props) {
  const params = await props.params;
  const postId = params.id;
  const orgId = await getOrganizationId();

  return (
    <Modal>
      <PostDetails postId={postId} orgId={orgId!} />
    </Modal>
  );
}
