import { PayloadJwt } from "../interfaces/createTokenJwt.interface";

export type NotificationEmail = {
  email: string;
  payloadJwt: PayloadJwt;
  url: string;
};
