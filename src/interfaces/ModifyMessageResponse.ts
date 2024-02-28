import { User } from './User';

export default interface ModifyMessageResponse {
  updateUser: {
    token?: string;
    message: string;
    user: User;
  }
}
