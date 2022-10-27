import { clearSavedUnhashedEmail } from "@/auth/client";
import { Button, LinkButton, MainContentBox, Page, Prose } from "@/components";
import { ArrowRightIcon } from "@primer/octicons-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignOut() {
  const { status } = useSession();
  const router = useRouter();

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
                iconRight={<ArrowRightIcon />}
              >
                Sign out
              </Button>
            </div>

            <div>
              <LinkButton onClick={() => router.back()}>
                Stay signed in
              </LinkButton>
            </div>
          </>
        )}

        {status === "unauthenticated" && (
          <>
            <Prose>
              <h1>You’ve been signed out</h1>

              <p>Come back soon and learn some more physics!</p>
            </Prose>

            <div>
              <Button
                color="green"
                link="/auth/signin"
                iconRight={<ArrowRightIcon />}
              >
                Sign in
              </Button>
            </div>
          </>
        )}
      </MainContentBox>
    </Page>
  );
}
