interface User {
  id?: string;
  username?: string;
  password?: string;
}

interface UserQuery {
  userByUsername: User;
}

interface UserLogin {
  username: string;
  id: string;
}

interface TokenUser {
  id: string;
}

interface UserIdWithToken {
  id: string;
  token: string;
}

interface UserAndToken {
  username?: string;
  password?: string;
  token?: string;
}

export type { User, UserQuery, UserLogin, TokenUser, UserIdWithToken, UserAndToken};
