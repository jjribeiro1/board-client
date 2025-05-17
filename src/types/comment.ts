export type Comment = {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
