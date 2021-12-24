import { clearSavedUnhashedEmail } from "@/auth/use-unhashed-email";
import { Button, MainContentBox, Page, Prose } from "@/components";
import { ArrowRightIcon } from "@primer/octicons-react";
import { signOut, useSession } from "next-auth/react";

export default function SignOut() {
  const { status } = useSession();

  return (
    <Page title="Sign Out">
      <MainContentBox marginTop="small" className="text-center">
        {(status === "authenticated" || status === "loading") && (
          <>
            <Prose>
              <h1>Sign Out</h1>

              <p>Are you sure you want to sign out?</p>
            </Prose>

            <div>
              <Button
                color="yellow"
                onClick={() => {
                  clearSavedUnhashedEmail();
                  signOut({ redirect: false });
                }}
                disabled={status === "loading"}
              >
                Sign out <ArrowRightIcon />
              </Button>
            </div>
          </>
        )}

        {status === "unauthenticated" && (
          <>
            <Prose>
              <h1>You’ve been signed out</h1>

              <p>Come back soon to learn some more physics!</p>
            </Prose>

            <div>
              <Button color="green" link="/auth/signin">
                Sign in <ArrowRightIcon />
              </Button>
            </div>
          </>
        )}
      </MainContentBox>
    </Page>
  );
}
