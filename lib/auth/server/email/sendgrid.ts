import sgMail from "@sendgrid/mail";
import { EmailProvider } from "./types";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendgridProvider: EmailProvider = {
  async send(options) {
    await sgMail.send({
      to: options.toAddresses,
      from: {
        name: options.fromName,
        email: options.fromAddress,
      },
      subject: options.subject,
      text: options.textBody,
      html: options.htmlBody,

      // Make sure Sendgrid doesn't insert tracking BS (which fucks up links and
      // is also obnoxious).
      trackingSettings: {
        clickTracking: {
          enable: false,
          enableText: false,
        },
        openTracking: {
          enable: false,
        },
        subscriptionTracking: {
          enable: false,
        },
        ganalytics: {
          enable: false,
        },
      },
    });
  },
};
