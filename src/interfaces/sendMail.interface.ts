export interface IsendMail {
  sendMessage(to: string, subject: string, body: string): Promise<void>;
}
