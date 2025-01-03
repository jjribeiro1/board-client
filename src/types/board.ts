export type Board = {
  id: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isLocked: boolean;
  organizationId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};
