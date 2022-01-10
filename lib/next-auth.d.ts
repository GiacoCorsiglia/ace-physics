// Augment NextAuth types.
// https://next-auth.js.org/getting-started/typescript
// For some reason, the suggested method doesn't work, so I need to do all this
// extra business.
// Also, putting this in `types.d.ts` breaks the other declared types.
import "next-auth";
import "next-auth/core/types";
declare module "next-auth" {
  import type { DefaultSession } from "next-auth/core/types";

  export interface Session {
    user?: DefaultSession["user"] & {
      role?: "student" | "instructor" | "admin";
    };
  }

  export interface User {
    role?: "student" | "instructor" | "admin";
  }
}
declare module "next-auth/core/types" {
  export interface Session {
    user?: DefaultSession["user"] & {
      role?: "student" | "instructor" | "admin";
    };
  }

  export interface User {
    role?: "student" | "instructor" | "admin";
  }
}
