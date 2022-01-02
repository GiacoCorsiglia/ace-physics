import { saveUnhashedEmail, useUnhashedEmail } from "@/auth/use-unhashed-email";
import {
  Button,
  Callout,
  Horizontal,
  MainContentBox,
  Page,
  Prose,
  TextInputControl,
  Vertical,
} from "@/components";
import { ArrowRightIcon } from "@primer/octicons-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const simpleEmailPattern = /(.+)@(.+){2,}\.(.+){2,}/;

export default function SignIn() {
  const session = useSession();
  const unhashedEmail = useUnhashedEmail(session.data?.user?.email);

  const [email, setEmail] = useState("");
  const router = useRouter();

  const callbackUrlQ = router.query.callbackUrl;
  const callbackUrl = Array.isArray(callbackUrlQ)
    ? callbackUrlQ[0]
    : callbackUrlQ;

  // Errors.
  const errorQ = router.query.error;
  const errorType = Array.isArray(errorQ) ? errorQ[0] : errorQ;
  // This is lifted directly from NextAuth.
  // https://github.com/nextauthjs/next-auth/blob/main/src/core/pages/signin.tsx#L42
  const errors: Record<string, string> = {
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallback: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email inbox.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page.",
    default: "Unable to sign in.",
  };
  const errorMessage = errorType && (errors[errorType] ?? errors.default);
  const errorHtml = errorMessage && (
    <Callout animateIn color="red">
      {errorMessage}
    </Callout>
  );

  const isEmailValid = simpleEmailPattern.test(email);

  if (session.status === "authenticated") {
    return (
      <Page title="Sign In">
        <MainContentBox marginTop="small" className="text-center">
          <Prose>
            <h1>You’re signed in</h1>
          </Prose>

          {errorHtml}

          <Prose>
            <p>
              You’re currently signed in
              {unhashedEmail && " as "}
              {unhashedEmail && <strong>{unhashedEmail}</strong>}.
            </p>
          </Prose>

          <Vertical.Space before={300}>
            <Horizontal justify="center">
              <Button color="yellow" link="/auth/signout">
                Sign out
              </Button>

              <Button color="green" link={callbackUrl || "/"}>
                Stay signed in <ArrowRightIcon />
              </Button>
            </Horizontal>
          </Vertical.Space>
        </MainContentBox>
      </Page>
    );
  }

  return (
    <Page title="Sign In">
      <MainContentBox marginTop="small" className="text-center">
        <Prose>
          <h1>Sign in to ACE Physics</h1>
        </Prose>

        {errorHtml}

        <Prose>
          <p>Sign in with your email below.</p>

          <p>If you're a student, use your educational email.</p>
        </Prose>

        <Vertical.Space before={200} after={200}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveUnhashedEmail(email);
              signIn("email", {
                email,
                callbackUrl,
              });
            }}
          >
            <Vertical>
              <TextInputControl
                value={email}
                onChange={setEmail}
                placeholder="email@example.com"
                aria-label="Your email address"
                style={{
                  maxWidth: "24rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "center",
                }}
              />

              <Button
                color="green"
                type="submit"
                disabled={!isEmailValid}
                disabledExplanation="Please enter a valid email address before signing in."
              >
                Sign in <ArrowRightIcon />
              </Button>
            </Vertical>
          </form>
        </Vertical.Space>

        <Prose size="small" faded>
          <p>
            You’ll receive a message with a link to sign in, but we’ll never
            send you anything else.
          </p>

          <p>
            If it's your first time here, an account will be created for you
            automatically.
          </p>
        </Prose>
      </MainContentBox>
    </Page>
  );
}
