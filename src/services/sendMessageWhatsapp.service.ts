import { IsendMessageWhatsapp } from "../interfaces/sendMessageWhatsapp.interface";

export class SendMessageWhatsappService implements IsendMessageWhatsapp {
  async sendMessage(phone: string, message: string): Promise<void> {
    const GZAPPY_URL = process.env.API_WHATSAPP_ENDPOINT as string;

    const response = await fetch(GZAPPY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user_token_id: process.env.USER_TOKEN_ID as string,
      },
      body: JSON.stringify({
        instance_id: process.env.INSTANCE_ID,
        instance_token: process.env.WHATSAPP_CREDENTIALS,
        message: [message.replace(/\s+/g, " ")],
        phone: `55${phone}`,
      }),
    });

    const data = await response.json();

    console.log(data);
    // { msg: 'Messages sent' }
  }
}
