import { Status } from "./status";

export type Post = {
  id: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isPinned: boolean;
  isLocked: boolean;
  boardId: string;
  organizationId: string;
  author: {
    id: string;
    name: string;
  };
  statusId: string;
  tagsId: string[];
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};
