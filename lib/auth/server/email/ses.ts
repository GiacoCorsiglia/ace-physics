import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { EmailProvider } from "./types";

const client = new SESv2Client({
  // We never specify the endpoint because we always use real AWS for email.
  region: process.env.ACE_AWS_REGION,
  credentials: {
    accessKeyId:
      process.env.ACE_AWS_SES_ACCESS_KEY || process.env.ACE_AWS_ACCESS_KEY,
    secretAccessKey:
      process.env.ACE_AWS_SES_SECRET_KEY || process.env.ACE_AWS_SECRET_KEY,
  },
});

export const sesProvider: EmailProvider = {
  async send(options) {
    if (process.env.NEXT_PUBLIC_ACE_ENV === "development") {
      console.info("Sending email via SES to:", ...options.toAddresses);
    }

    const command = new SendEmailCommand({
      ConfigurationSetName: "AcePhysicsEmails",
      Destination: {
        ToAddresses: options.toAddresses,
      },
      FromEmailAddress: `"${options.fromName}" <${options.fromAddress}>`,
      Content: {
        Simple: {
          Subject: {
            Data: options.subject,
            Charset: "UTF-8",
          },
          Body: {
            Html: {
              Data: options.htmlBody,
              Charset: "UTF-8",
            },
            Text: {
              Data: options.textBody,
              Charset: "UTF-8",
            },
          },
        },
      },
    });

    await client.send(command);
  },
};
