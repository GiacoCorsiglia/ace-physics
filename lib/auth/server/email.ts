// See https://next-auth.js.org/providers/email#customizing-emails
// Since we're using AWS SES, we don't need to use nodemailer, and can override
// this function to just use the SES API directly.
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";

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

export const sendVerificationRequest = async ({
  identifier: email,
  url,
}: {
  identifier: string;
  url: string;
}) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Log in as ${email} with this link:`);
    console.log(url);
    return;
  }

  const { host } = new URL(url);

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [email],
    },
    FromEmailAddress: "no-reply@acephysics.net",
    Content: {
      Simple: {
        Subject: {
          Data: `Sign in to ${host}`,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: html({ url, host, email }),
            Charset: "UTF-8",
          },
          Text: {
            Data: text({ url, host }),
            Charset: "UTF-8",
          },
        },
      },
    },
  });

  await client.send(command);
};

// The below is only slightly modified from Next Auth.

// Email HTML body.
function html({ url, host, email }: Record<"url" | "host" | "email", string>) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  // Some simple styling options.
  const backgroundColor = "#efe4d2";
  const textColor = "#26190d";
  const mainBackgroundColor = "#faf3e5";
  const buttonBackgroundColor = "#1ca625";
  const buttonBorderColor = "#107e17";
  const buttonTextColor = "#ffffff";
  const fonts = "font-family: Helvetica, Arial, sans-serif";

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 16px 0px 16px 0px; font-size: 22px; ${fonts}; color: ${textColor};">
        <strong>${escapedHost}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 8px;">
    <tr>
      <td align="center" style="padding: 16px 0px 0px 0px; font-size: 18px; ${fonts}; color: ${textColor};">
        Sign in as <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 16px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; ${fonts}; color: ${buttonTextColor}; text-decoration: none; border-radius: 4px; padding: 12px 24px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 8px 0px; font-size: 16px; line-height: 22px; ${fonts}; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: Record<"url" | "host", string>) {
  return `Sign in to ${host}:\n${url}\n\n`;
}
