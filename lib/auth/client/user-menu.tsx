import {
  Button,
  Callout,
  HeaderPopover,
  Horizontal,
  LoadingAnimation,
  Prose,
  Vertical,
} from "@/components";
import { PersonIcon } from "@primer/octicons-react";
import { signIn } from "next-auth/react";
import { useAuth } from "./use-auth";
import { useUnhashedEmail } from "./use-unhashed-email";

export const UserMenu = () => {
  const auth = useAuth();
  const unhashedEmail = useUnhashedEmail(
    auth.status === "authenticated" ? auth.user?.email : undefined
  );

  return (
    <HeaderPopover icon={<PersonIcon aria-label="My Account Menu" />}>
      {auth.status === "loading" && <LoadingAnimation />}

      {auth.status === "authenticated" && (
        <Vertical>
          <Callout
            color="green"
            title={`You’re signed in ${unhashedEmail ? "as" : ""}`}
            className="text-small text-center"
          >
            {unhashedEmail}
          </Callout>

          <Horizontal justify="stretch" spacing={50}>
            {auth.user.role === "admin" && (
              <Button color="yellow" size="small" link="/admin">
                Admin
              </Button>
            )}

            <Button color="green" size="small" link="/courses">
              Courses
            </Button>

            <Button color="blue" size="small" link="/auth/signout">
              Sign out
            </Button>
          </Horizontal>
        </Vertical>
      )}

      {auth.status === "unauthenticated" && (
        <Vertical>
          <Prose size="small">You’re not signed in.</Prose>

          <Button color="blue" size="small" onClick={() => signIn()}>
            Sign in
          </Button>
        </Vertical>
      )}
    </HeaderPopover>
  );
};
