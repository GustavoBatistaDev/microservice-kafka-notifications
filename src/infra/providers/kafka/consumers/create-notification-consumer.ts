import { IsendMail } from "interfaces/sendMail.interface";
import { kafkaConsumer } from "../consumer";
import { SendMailService } from "../../../../services/sendMail.service";
import {
  ICreateTokenJwtService,
  PayloadJwt,
} from "../../../../interfaces/createTokenJwt.interface";
import { CreateTokenJwtService } from "../../../../services/createTokenJwt.service";
import { IsendMessageWhatsapp } from "../../../../interfaces/sendMessageWhatsapp.interface";
import { SendMessageWhatsappService } from "../../../../services/sendMessageWhatsapp.service";

type NotificationEmail = {
  email: string;
  payloadJwt: PayloadJwt;
  url: string;
};

type NotificationWhatsapp = {
  message: string;
  phone: string;
};

export class NotificationConsumerVerifyEmail {
  constructor(
    private readonly sendMailService: IsendMail,
    private readonly createTokenJwtService: ICreateTokenJwtService,
  ) {}

  public createNotificationConsumer = async () => {
    console.log("CONSUMER NOTIFICATION EMAIL");
    const consumer = await kafkaConsumer(
      "notification-email",
      "verify-password",
    );
    await consumer.run({
      eachMessage: async ({ message }) => {
        const messageToString = message.value!.toString();
        const messageObject = JSON.parse(messageToString) as NotificationEmail;
        console.log(messageObject);
        try {
          const token = this.createTokenJwtService.createToken(
            messageObject.payloadJwt,
            process.env.JWT_SECRETY_KEY!,
          );

          this.sendMailService.sendMessage(
            messageObject.email,
            "Verificação de email",
            `${process.env.SERVER_EXPRESS_PROTOCOL}://${process.env.SERVER_EXPRESS_HOST}:${process.env.SERVER_EXPRESS_MICROSERVICE_SCHEDULING_PORT}${messageObject.url}?token=${token}`,
          );
        } catch (error) {
          console.log(error);
        }
      },
    });
  };
}

export class NotificationConsumerChangePassword {
  constructor(
    private readonly sendMailService: IsendMail,
    private readonly createTokenJwtService: ICreateTokenJwtService,
  ) {}

  public createNotificationConsumer = async () => {
    console.log("CONSUMER NOTIFICATION EMAIL CHANGE PASSWORD");
    const consumer = await kafkaConsumer(
      "notification-email-change-password",
      "change-password",
    );
    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const messageToString = message.value!.toString();
          const messageObject = JSON.parse(
            messageToString,
          ) as NotificationEmail;

          const token = this.createTokenJwtService.createToken(
            messageObject.payloadJwt,
            process.env.JWT_SECRETY_KEY!,
          );

          console.log(messageObject);
          this.sendMailService.sendMessage(
            messageObject.email,
            "Alteração de senha",
            `${process.env.SERVER_EXPRESS_PROTOCOL}://${process.env.SERVER_EXPRESS_HOST}:${process.env.SERVER_EXPRESS_MICROSERVICE_SCHEDULING_PORT}${messageObject.url}${token}`,
          );
        } catch (error) {
          console.log(error);
        }
      },
    });
  };
}

export class NotificationConsumerScheduledAppointment {
  constructor(
    private readonly sendMessageWhatsAppService: IsendMessageWhatsapp,
  ) {}

  public createNotificationConsumer = async () => {
    console.log("CONSUMER NOTIFICATION WHATSAPP");
    const consumer = await kafkaConsumer(
      "notification-whatsapp",
      "notification-whatsapp-scheduled-appointment",
    );

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const messageToString = message.value!.toString();
          const messageObject = JSON.parse(
            messageToString,
          ) as NotificationWhatsapp;
          console.log(messageObject);

          await this.sendMessageWhatsAppService.sendMessage(
            messageObject.phone,
            messageObject.message,
          );
        } catch (error) {
          console.log(error);
        }
      },
    });
  };
}

const sendMailServiceInstance = new SendMailService();
const createTokenJwtService = new CreateTokenJwtService();

const notificationConsumer = new NotificationConsumerVerifyEmail(
  sendMailServiceInstance,
  createTokenJwtService,
);

notificationConsumer.createNotificationConsumer();

const sendMailServiceInstance2 = new SendMailService();
const notificationChangePassword = new NotificationConsumerChangePassword(
  sendMailServiceInstance2,
  createTokenJwtService,
);

notificationChangePassword.createNotificationConsumer();

const sendMessageWhatsappService = new SendMessageWhatsappService();

const notificationConsumerScheduledAppointment =
  new NotificationConsumerScheduledAppointment(sendMessageWhatsappService);

notificationConsumerScheduledAppointment.createNotificationConsumer();
