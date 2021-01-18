import { createLearner } from "@/api/client";
import { formatId, rememberLearnerId, useAuth } from "@/auth";
import styles from "@/auth/account.module.scss";
import { Prose } from "@/design";
import { Content, Page } from "@/design/layout";
import { Button } from "@/inputs";
import * as urls from "@/urls";
import { ArrowRightIcon } from "@primer/octicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withNext = (a: string, _: string) => a;

export default function CreateAccount() {
  const router = useRouter();
  const { auth } = useAuth();

  const [status, setStatus] = useState<
    "initial" | "loading" | "error" | "success" | "saved"
  >("initial");

  const [newId, setNewId] = useState("");

  // TODO
  const next = "/";

  useEffect(() => {
    // Can't create an account if you're already logged in!
    if (auth.isLoggedIn) {
      router.push(withNext(urls.Login.link, next));
    }
    // We only ever want to run this effect once.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page title="Create an Account">
      <Content as="main">
        <Prose>
          <h1>Create an anonymous account</h1>

          <p>Welcome to ACEPhysics.net!</p>

          <p>
            Use this page to create an anonymous account to access our online
            physics activities. The account will be fully featured, but it will
            not be associated with any school or physics course.
          </p>

          <p>
            <strong>
              If you are a student, your professor has probably already created
              an account for you. You should go{" "}
              <Link href={withNext(urls.Login.link, next)}>log in</Link> with
              that account instead.
            </strong>
          </p>

          <p>
            To protect your privacy, we don’t ask for your name, email, or any
            other personal information. Your “account” will be identified by a
            randomly generated six-digit code. You can log in with that code
            anytime to access your saved responses in an in-progress or
            previously-completed tutorial.
          </p>
        </Prose>

        {(status === "initial" || status === "loading") && (
          <>
            <Prose>Click below to generate your account code.</Prose>

            <div className="text-center margin-top">
              <Button
                disabled={status === "loading"}
                onClick={async () => {
                  setStatus("loading");

                  const result = await createLearner();

                  if (result.failed) {
                    setStatus("error");
                  } else {
                    setStatus("success");
                    const learnerId = result.value.learnerId;
                    setNewId(learnerId);
                    rememberLearnerId(learnerId);
                  }
                }}
              >
                {status === "loading"
                  ? "Generating..."
                  : "Generate my account code"}
              </Button>
            </div>
          </>
        )}

        {status === "error" && (
          <Prose>
            Sorry, but something went wrong. Consider refreshing the page and
            trying again, perhaps after waiting a little while.
          </Prose>
        )}

        {(status === "success" || status === "saved") && (
          <Prose>
            <p>Congrats! Here’s your new account code:</p>

            <p className={styles.newAccountCode}>{formatId(newId)}</p>

            <p>
              <strong>
                Save this account code somewhere. If you forget it, it CANNOT be
                recovered!
              </strong>
            </p>
          </Prose>
        )}

        {(status === "success" || status === "saved") && (
          <div className="text-center margin-top">
            <Button
              onClick={() => setStatus("saved")}
              disabled={status === "saved"}
            >
              I promise I’ve saved my code <ArrowRightIcon />
            </Button>
          </div>
        )}

        {status === "saved" && (
          <>
            <Prose>
              Great! Now that you've saved your code, you can log in. Enjoy the
              tutorials!
            </Prose>

            <div className="text-center margin-top">
              <Button link={withNext(urls.Login.link, next)}>
                Go log in <ArrowRightIcon />
              </Button>
            </div>

            <Prose className="text-center">
              You'll have to click “Log in” on the next page.
            </Prose>
          </>
        )}
      </Content>
    </Page>
  );
}
