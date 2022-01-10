import { ResponseError } from "@/api/client";
import { Auth } from "@/auth/client";
import { Html } from "@/helpers/client";
import { LoadingAnimation } from ".";
import { Callout } from "./callouts";

export const AuthGuard = ({
  auth,
  allowed,
  children,
  errors,
  loading,
}: {
  auth: Auth;
  allowed: boolean;
  children?: Html;
  errors?: (ResponseError | undefined) | (ResponseError | undefined)[];
  loading?: boolean;
}) => {
  if (loading || auth.status === "loading") {
    return <LoadingAnimation size="large" />;
  }

  errors = errors ? (Array.isArray(errors) ? errors : [errors]) : [];
  const anyForbidden = errors.some((e) => e && e.type === "403 FORBIDDEN");

  if (auth.status === "unauthenticated" || !allowed || anyForbidden) {
    return (
      <Callout color="red">You aren’t allowed to access this page.</Callout>
    );
  }

  return <>{children}</>;
};
