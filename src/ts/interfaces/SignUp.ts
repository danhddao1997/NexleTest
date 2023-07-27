export interface SignUpPayload {
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
