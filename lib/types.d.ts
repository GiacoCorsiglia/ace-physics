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
    // Public.
    readonly NEXT_PUBLIC_ACE_ENV: "production" | "staging" | "development";
    // Public, for local.
    readonly NEXT_PUBLIC_LOCAL_API: "yes" | "no" | undefined;
  }
}

// Redux Dev Tools.
interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: any;
}
