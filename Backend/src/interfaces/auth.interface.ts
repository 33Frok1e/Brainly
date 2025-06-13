export interface IAuthTokenPayload {
  userId: string;
}

export interface IAuthResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
  };
}