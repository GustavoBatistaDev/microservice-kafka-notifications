export interface IsendMessageWhatsapp {
  sendMessage(phone: string, message: string): Promise<void>;
}
