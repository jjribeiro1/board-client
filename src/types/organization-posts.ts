import { Post } from "./post";
import { Status } from "./status";
import { Board } from "./board";

export interface OrganizationPostsData extends Post {
  board: Board;
  status: Status;
  _count: {
    comments: number;
  };
}
