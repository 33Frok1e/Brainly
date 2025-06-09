export interface IAuthToken {
  userId: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput {
  username: string;
  email: string;
  password: string;
}
