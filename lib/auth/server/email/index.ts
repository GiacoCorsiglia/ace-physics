// See https://next-auth.js.org/providers/email#customizing-emails
// Since we're using AWS SES, we don't need to use nodemailer, and can override
// this function to just use the SES API directly.
import { sendgridProvider } from "./sendgrid";
import { sesProvider } from "./ses";
import { SendEmailOptions } from "./types";

const PROVIDER = process.env.ACE_EMAIL_PROVIDER;

const defaultProvider =
  PROVIDER === "ses"
    ? sesProvider
    : PROVIDER === "sendgrid"
      ? sendgridProvider
      : null;

export const sendVerificationRequest = async ({
  identifier: email,
  url,
}: {
  identifier: string;
  url: string;
}) => {
  if (!defaultProvider) {
    console.log(`Log in as ${email} with this link:`);
    console.log(url);
    return;
  }

  const { host } = new URL(url);

  const options: SendEmailOptions = {
    toAddresses: [email],
    fromAddress: "no-reply@acephysics.net",
    fromName: "ACE Physics",
    subject: `Sign in to ${host}`,
    htmlBody: html({ url, host, email }),
    textBody: text({ url, host, email }),
  };

  await defaultProvider.send(options);
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
function text({ url, host, email }: Record<"url" | "host" | "email", string>) {
  return [
    host,
    "",
    `Sign in as ${email}:`,
    url,
    "",
    "If you did not request this email you can safely ignore it.\n\n",
  ].join("\n");
}
