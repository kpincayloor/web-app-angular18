export interface IAuthResponse {
  message: string | null;
  isAuthenticated: boolean;
  username: string;
  token: string;
  expiresOn: string;
}
