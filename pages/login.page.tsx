import { formatId, rememberedLearnerId, unformatId, useAuth } from "@/auth";
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
import * as urls from "@/urls";
import { ArrowRightIcon } from "@primer/octicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const inputPattern = /^\d{0,3}( |-|,)?\d{0,3}$/;
const idPattern = /^\d{3}( |-|,)?\d{3}$/;
const idStartPattern = /^\d{3}$/;
const idStartWithDashPattern = /^\d{3}\-$/;

const withNext = (link: string, next: string) =>
  link + (next ? `?next=${encodeURIComponent(next)}` : "");

export default function Login() {
  const { auth, login, logout } = useAuth();
  const router = useRouter();

  const nextParam = router.query.next || "/";
  const next = decodeURIComponent(
    typeof nextParam === "string" ? nextParam : "/"
  );

  const wasLoggedOut = useMemo(() => router.query.logout === "yes", [router]);

  const [id, setId] = useState(() => {
    const saved = rememberedLearnerId();
    if (!saved || !inputPattern.test(saved)) {
      return "";
    }
    return formatId(unformatId(saved));
  });

  const [status, setStatus] = useState<
    "initial" | "loading" | "not-found" | "error"
  >("initial");

  const isIdValid = idPattern.test(id);

  if (auth.isLoggedIn) {
    return (
      <Page title="Log In">
        <MainContentBox marginTop="small">
          <Prose>
            <h1>Welcome to ACE Physics</h1>

            <p>
              Looks like you’re signed in with the account code:{" "}
              <strong>{formatId(auth.learner.learnerId)}</strong>
            </p>

            {!auth.isForCredit && (
              <p>
                This account is <strong>not</strong> associated with a course,
                so any work you do <strong>will not</strong> count for course
                credit.
              </p>
            )}
          </Prose>

          <Vertical.Space before={300}>
            <Horizontal justify="center">
              <Button color="yellow" onClick={() => logout()}>
                Log out
              </Button>

              <Button color="green" link={next}>
                Stay logged in <ArrowRightIcon />
              </Button>
            </Horizontal>
          </Vertical.Space>
        </MainContentBox>
      </Page>
    );
  }

  return (
    <Page title="Log In">
      <MainContentBox marginTop="small">
        <Prose>
          <h1>Welcome to ACE Physics</h1>

          {wasLoggedOut && (
            <Callout color="green">You’ve been logged out.</Callout>
          )}

          <p>Please sign in using your six-digit account code.</p>
        </Prose>

        <Vertical.Space before={200} after={200}>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!isIdValid || status === "loading") {
                return;
              }

              setStatus("loading");

              const learnerId = unformatId(id);
              login(learnerId).then((outcome) => {
                switch (outcome) {
                  case "already-logged-in":
                  case "success":
                    router.push(next);
                    return;
                  case "not-found":
                  case "error":
                    setStatus(outcome);
                    return;
                }
              });
            }}
          >
            <Horizontal justify="center">
              <TextInputControl
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                maxWidth
                aria-label="Your six-digit account code"
                placeholder="000-000"
                value={id}
                onChange={(input) => {
                  if (
                    idStartPattern.test(input) &&
                    !idStartWithDashPattern.test(id) // Allow deleting.
                  ) {
                    setId(`${input}-`);
                  } else if (inputPattern.test(input)) {
                    setId(input);

                    if (status === "not-found") {
                      setStatus("initial");
                    }
                  }
                }}
              />

              <Button
                color="green"
                type="submit"
                disabled={!isIdValid || status === "loading"}
              >
                {status === "loading" ? (
                  <>Loading…</>
                ) : (
                  <>
                    Log in <ArrowRightIcon />
                  </>
                )}
              </Button>
            </Horizontal>
          </form>
        </Vertical.Space>

        {status === "not-found" && (
          <Callout color="red">
            Sorry, there isn’t any account associated with that code. Please try
            again.
          </Callout>
        )}

        {status === "error" && (
          <Callout color="red">Sorry, something went wrong.</Callout>
        )}

        <Prose>
          <p>
            Don't know where to find your account code? Your professor probably
            shared one with you at the start of the semester, possibly via email
            or as a “grade” in your Canvas gradebook. You can copy-and-paste
            that here.
          </p>

          <p>
            If you’d like to test out ACEPhysics.net or explore the tutorials{" "}
            <em>without getting class participation credit,</em> then you can{" "}
            <Link href={withNext(urls.CreateAccount.link, next)}>
              create an account
            </Link>
            .
          </p>
        </Prose>
      </MainContentBox>
    </Page>
  );
}
