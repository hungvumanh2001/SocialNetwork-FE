import {User} from "./user";

export interface Status{
  id: number;
  content: string;
  createAt: string
  status: string;
  owner: User;
}
