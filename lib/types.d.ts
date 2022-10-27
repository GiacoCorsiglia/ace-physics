/** Global type declarations & shims. */

// Declare environment variables.
declare namespace NodeJS {
  interface ProcessEnv {
    // Private.
    readonly ACE_AWS_ENDPOINT: string | undefined;
    readonly ACE_AWS_ACCESS_KEY: string;
    readonly ACE_AWS_SECRET_KEY: string;
    readonly ACE_AWS_SES_ACCESS_KEY: string | undefined;
    readonly ACE_AWS_SES_SECRET_KEY: string | undefined;
    readonly ACE_AWS_REGION: string;
    readonly ACE_TABLE_NAME: string;
    // See: https://next-auth.js.org/configuration/options#secret
    readonly ACE_NEXT_AUTH_SECRET: string | undefined;
    readonly ACE_EMAIL_PROVIDER: "disabled" | "ses" | "sendgrid";
    readonly SENDGRID_API_KEY: string;

    // Public.
    readonly NEXT_PUBLIC_ACE_ENV: "production" | "staging" | "development";
    readonly NEXT_PUBLIC_ACE_DATABASE_ENABLED: "yes" | "no" | undefined;
  }
}

// Redux Dev Tools.
interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: any;
}
