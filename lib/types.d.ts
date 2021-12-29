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

// Augment NextAuth types.
// https://next-auth.js.org/getting-started/typescript
// For some reason, the suggested method doesn't work, so I need to do all this
// extra business.
import "next-auth";
import "next-auth/core/types";
declare module "next-auth" {
  import type { DefaultSession } from "next-auth/core/types";

  export interface Session {
    user?: DefaultSession["user"] & {
      role?: "instructor" | "admin";
    };
  }

  export interface User {
    role?: "instructor" | "admin";
  }
}
declare module "next-auth/core/types" {
  export interface Session {
    user?: DefaultSession["user"] & {
      role?: "instructor" | "admin";
    };
  }

  export interface User {
    role?: "instructor" | "admin";
  }
}
