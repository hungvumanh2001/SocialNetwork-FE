import {Role} from "./role";

export interface UserToken {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  birthday: string;
  fullname: string;
  avatar: string;
  address: string;
  hobby: string;
  enabled: boolean;
  roles: [Role];
  accessToken: string;
}
