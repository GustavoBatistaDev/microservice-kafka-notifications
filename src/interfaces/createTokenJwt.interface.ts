export type PayloadJwt = {
  userId: number;
  exp: number;
};

export interface ICreateTokenJwtService {
  createToken(payload: PayloadJwt, secretKeyJwt: string): string;
}
