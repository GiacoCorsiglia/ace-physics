import { Button, HeaderPopover, Prose, Vertical } from "@/components";
import { PersonIcon } from "@primer/octicons-react";
import { signIn, useSession } from "next-auth/react";
import { useUnhashedEmail } from "./use-unhashed-email";

export const UserMenu = () => {
  const session = useSession();
  const unhashedEmail = useUnhashedEmail(session.data?.user?.email);

  if (session.status === "authenticated") {
    session.data.user!.email;
  }

  return (
    <HeaderPopover icon={<PersonIcon aria-label="My Account Menu" />}>
      {session.status === "authenticated" && (
        <Vertical>
          <Prose size="small">
            You’re currently signed in
            {unhashedEmail && " as "}
            {unhashedEmail && <strong>{unhashedEmail}</strong>}.
          </Prose>

          {/* {!auth.isForCredit && (
            <Prose size="small">
              This is an anonymous account. Your work will <strong>not</strong>{" "}
              count for any course credit.
            </Prose>
          )} */}

          <Button color="blue" size="small" link="/auth/signout">
            Sign out
          </Button>
        </Vertical>
      )}

      {session.status === "unauthenticated" && (
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
