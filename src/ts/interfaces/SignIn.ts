import {User} from 'ts/DAOs';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
