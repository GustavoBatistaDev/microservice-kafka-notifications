import jwt from "jsonwebtoken";

import {
  ICreateTokenJwtService,
  PayloadJwt,
} from "../interfaces/createTokenJwt.interface";

export class CreateTokenJwtService implements ICreateTokenJwtService {
  public createToken(payload: PayloadJwt, secretKeyJwt: string): string {
    const token = jwt.sign(payload, secretKeyJwt);
    return token;
  }
}
