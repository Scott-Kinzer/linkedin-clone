export enum Token {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
