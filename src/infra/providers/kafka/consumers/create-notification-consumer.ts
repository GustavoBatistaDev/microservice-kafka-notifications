import { IsendMail } from "interfaces/sendMail.interface";
import { kafkaConsumer } from "../consumer";
import { SendMailService } from "../../../../services/sendMail.service";
import {
  ICreateTokenJwtService,
  PayloadJwt,
} from "../../../../interfaces/createTokenJwt.interface";
import { CreateTokenJwtService } from "../../../../services/createTokenJwt.service";

type notificationConsumer = {
  email: string;
  payloadJwt: PayloadJwt;
};

export class NotificationConsumer {
  constructor(
    private readonly sendMailService: IsendMail,
    private readonly createTokenJwtService: ICreateTokenJwtService,
  ) {}

  public createNotificationConsumer = async () => {
    const consumer = await kafkaConsumer("notification-email");
    await consumer.run({
      eachMessage: async ({ message }) => {
        const messageToString = message.value!.toString();
        const messageObject = JSON.parse(
          messageToString,
        ) as notificationConsumer;

        try {
          const token = this.createTokenJwtService.createToken(
            messageObject.payloadJwt,
            process.env.JWT_SECRETY_KEY!,
          );

          this.sendMailService.sendMessage(
            messageObject.email,
            "Verificação de email",
            `${process.env.SERVER_EXPRESS_PROTOCOL}://${process.env.SERVER_EXPRESS_HOST}:${process.env.SERVER_EXPRESS_MICROSERVICE_SCHEDULING_PORT}${process.env.ROUTE_VERIFY_EMAIL}?token=${token}`,
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

const notificationConsumer = new NotificationConsumer(
  sendMailServiceInstance,
  createTokenJwtService,
);

notificationConsumer.createNotificationConsumer();
