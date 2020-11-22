export type JwtToken = {
  access_token: string;
};

export type GoogleProfile = {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  emails: { value: string; verified: boolean }[];
  photos: {
    value: string;
  }[];
  provider: string;
  _raw: string;
  _json: { [key: string]: string };
};

export type OAuthUser = {
  name: string;
  email: string;
  oAuthId: string;
  oAuthProvider: string;
};
