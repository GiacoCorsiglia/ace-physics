import { saveUnhashedEmail, useUnhashedEmail } from "@/auth/client";
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
import { Html } from "@/helpers/client";
import { ArrowRightIcon } from "@primer/octicons-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const simpleEmailPattern = /(.+)@(.+){2,}\.(.+){2,}/;

const useCallbackUrl = () => {
  const router = useRouter();

  const callbackUrlQ = router.query.callbackUrl;
  const callbackUrl = Array.isArray(callbackUrlQ)
    ? callbackUrlQ[0]
    : callbackUrlQ;

  return callbackUrl;
};

const SignInPageContent = ({ children }: { children?: Html }) => {
  return (
    <Page title="Sign In">
      <MainContentBox marginTop="small" className="text-center">
        {children}
      </MainContentBox>
    </Page>
  );
};

const SignedInView = ({ errorHtml }: { errorHtml?: Html }) => {
  const session = useSession();
  const unhashedEmail = useUnhashedEmail(session.data?.user?.email);
  const callbackUrl = useCallbackUrl();

  return (
    <SignInPageContent>
      <Prose>
        <h1>You’re signed in</h1>
      </Prose>

      {errorHtml}

      <Prose>
        <p>
          You’re signed in to ACE Physics
          {unhashedEmail && " as "}
          {unhashedEmail && <strong>{unhashedEmail}</strong>}.
        </p>
      </Prose>

      <Vertical.Space before={300}>
        <Horizontal justify="center">
          <Button color="yellow" link="/auth/signout">
            Sign out
          </Button>

          <Button
            color="green"
            link={callbackUrl || "/"}
            iconRight={<ArrowRightIcon />}
          >
            Stay signed in
          </Button>
        </Horizontal>
      </Vertical.Space>
    </SignInPageContent>
  );
};

const SignInWithEmail = () => {
  const session = useSession();

  const [email, setEmail] = useState("");

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<any>();

  const callbackUrl = useCallbackUrl();

  // Errors.
  const router = useRouter();
  const errorQ = router.query.error;
  const errorType = Array.isArray(errorQ) ? errorQ[0] : errorQ;
  // This is lifted directly from NextAuth .
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
    EmailSignin:
      // This is updated from NextAuth, but seems to be more accurate.
      "Sign in failed. We encountered an error when trying to send the sign in email.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page.",
    default: "Unable to sign in.",
  };
  const errorMessage =
    (signInError && "There was an error signing in.") ||
    (errorType && (errors[errorType] ?? errors.default));
  const errorHtml = errorMessage && (
    <Callout animateIn color="red">
      {errorMessage}
    </Callout>
  );

  const isEmailValid = simpleEmailPattern.test(email);

  if (session.status === "authenticated") {
    return <SignedInView errorHtml={errorHtml} />;
  }

  return (
    <SignInPageContent>
      <Prose>
        <h1>Sign in to ACE Physics</h1>
      </Prose>

      {errorHtml}

      <Prose>
        <p>Sign in with your email below.</p>

        <p>If you’re a student, use your educational email.</p>
      </Prose>

      <Vertical.Space before={200} after={200}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveUnhashedEmail(email);
            setIsSigningIn(true);
            signIn("email", {
              email,
              callbackUrl,
            })
              .catch((e) => setSignInError(e))
              .finally(() => setIsSigningIn(false));
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
              disabled={!isEmailValid || isSigningIn}
              disabledExplanation={
                !isEmailValid
                  ? "Please enter a valid email address before signing in."
                  : undefined
              }
            >
              Sign in <ArrowRightIcon />
            </Button>
          </Vertical>
        </form>
      </Vertical.Space>

      <Prose size="small" faded>
        <p>
          You’ll receive a message with a link to sign in, but we’ll never send
          you anything else.
        </p>

        <p>
          If it’s your first time here, an account will be created for you
          automatically.
        </p>
      </Prose>
    </SignInPageContent>
  );
};

const SignInWithMockProvider = () => {
  const session = useSession();

  const callbackUrl = useCallbackUrl();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<any>();

  if (session.status === "authenticated") {
    return <SignedInView />;
  }

  return (
    <SignInPageContent>
      <Prose>
        <h1>Sign in to ACE Physics</h1>
      </Prose>

      {signInError && (
        <Callout color="red">There was an error signing in.</Callout>
      )}

      <Prose size="small" faded>
        In Development Mode, you must sign in as Test User to see the tutorials.
      </Prose>

      <Button
        color="green"
        disabled={isSigningIn}
        onClick={() => {
          signIn("credentials", {
            callbackUrl,
          })
            .catch((e) => {
              console.error("Sign in error:", e);
              return setSignInError(e);
            })
            .finally(() => setIsSigningIn(false));
        }}
      >
        Sign in as Test User <ArrowRightIcon />
      </Button>

      <Prose size="small" faded>
        You’ll be signed in immediately, no email required.
      </Prose>
    </SignInPageContent>
  );
};

const SignIn =
  process.env.NEXT_PUBLIC_ACE_DATABASE_ENABLED === "no"
    ? SignInWithMockProvider
    : SignInWithEmail;
export default SignIn;
