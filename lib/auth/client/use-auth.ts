import type { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";

export type Auth =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | {
      status: "authenticated";
      expires: string;
      user: AuthUser;
    };

export type AuthUser = Session["user"] & { email: string };

// Slightly nicer version of NextAuth's useSession with better types.
export const useAuth = (...args: Parameters<typeof useSession>): Auth => {
  const session = useSession(...args);

  // It seems like this state should be impossible, but the NextAuth types don't
  // guarantee it.
  const isBadSession =
    session.status === "authenticated" &&
    (!session.data || !session.data.user || !session.data.user.email);

  useEffect(() => {
    if (isBadSession) {
      signOut();
    }
  }, [isBadSession]);

  return useMemo(() => {
    if (session.status === "loading") {
      return { status: "loading" };
    }

    if (session.status === "unauthenticated" || isBadSession) {
      return { status: "unauthenticated" };
    }

    return {
      status: "authenticated",
      expires: session.data!.expires,
      user: session.data!.user! as Session["user"] & { email: string },
    };
  }, [session, isBadSession]);
};
