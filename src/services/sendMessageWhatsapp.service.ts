import { IsendMessageWhatsapp } from "../interfaces/sendMessageWhatsapp.interface";
import axios from "axios";
import qs from "qs";

export class SendMessageWhatsappService implements IsendMessageWhatsapp {
  async sendMessage(phone: string, message: string): Promise<void> {
    const GZAPPY_URL = process.env.API_WHATSAPP_ENDPOINT as string;

    const data = qs.stringify({
      token: process.env.USER_TOKEN_ID,
      to: "+55" + "73988246869",
      body: [message.replace(/\s+/g, " ")],
    });

    const config = {
      method: "post",
      url: GZAPPY_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
