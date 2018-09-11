export class TokenResponeType {
  token: string;
  expiration: string;
  refreshToken: string;
}

export class AccessTokenType {
  id: string;
  auth_token: string;
  expires_in: string;
}

export class TokenType {
  accessToken: AccessTokenType;
  expiration: string;
  refreshToken: string;
}
