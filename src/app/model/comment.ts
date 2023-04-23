import {Status} from "./status";
import {User} from "./user";

export interface Comment{
  id: number,
  status: Status,
  comment: Comment,
  content: string,
  userComment: User,
  createAt: string,
  active: number,
}
