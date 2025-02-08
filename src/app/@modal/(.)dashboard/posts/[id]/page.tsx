import { Modal } from "@/components/ui/modal";
import { PostDetails } from "@/features/posts/components/post-details";

type Props = {
  params: {
    id: string;
  };
};

export default async function PostDetailsModal(props: Props) {
  const postId = (await props.params).id;

  return (
    <Modal>
      <PostDetails postId={postId} />
    </Modal>
  );
}
