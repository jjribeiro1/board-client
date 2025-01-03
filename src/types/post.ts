export type Post = {
  id: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isPinned: boolean;
  isLocked: boolean;
  boardId: string;
  authorId: string;
  statusId: string;
  tagsId: string[];
  createdAt: Date;
  updatedAt: Date;
};
