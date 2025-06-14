export type Comment = {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  postId: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
