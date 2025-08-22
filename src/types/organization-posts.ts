import { Post } from "./post";
import { Status } from "./status";
import { Board } from "./board";

export interface OrganizationPostsData extends Post {
  board: Board;
  status: Status;
  tags: Array<{
    tag: {
      id: string;
      name: string;
      color: string;
    };
  }>;
  _count: {
    comments: number;
  };
}
