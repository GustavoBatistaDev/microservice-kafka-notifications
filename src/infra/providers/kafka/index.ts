import { Kafka, logLevel } from "kafkajs";
import { config } from "dotenv";

config();

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [`${process.env.BROKER_ONE_KAFKA}`],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: `${process.env.USERNAME_KAFKA}`,
    password: `${process.env.PASSWORD_KAFKA}`,
  },
  logLevel: logLevel.ERROR,
});

export { kafka };
