import { IsendMail } from "interfaces/sendMail.interface";
import nodeMailer from "nodemailer";

export class SendMailService implements IsendMail {
  async sendMessage(to: string, subject: string, body: string): Promise<void> {
    const transporter = nodeMailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.PASSWORD_APP_SMTP,
      },
    });

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: to,
      subject: subject,
      text: body,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        throw new Error("Falha ao enviar email.");
      }
    });
  }
}
