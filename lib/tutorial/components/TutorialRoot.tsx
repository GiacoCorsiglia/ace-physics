import { useAuth } from "@/auth";
import { Prose } from "@/design";
import { Content } from "@/design/layout";
import * as globalParams from "@/globalParams";
import { JsxElement } from "@/helpers/frontend";
import { Button } from "@/inputs";
import { ArrowRightIcon, LockIcon } from "@primer/octicons-react";
import { css } from "linaria";
import { useRouter } from "next/router";
import { TutorialConfig } from "../config";
import styles from "./shared.module.scss";
import TutorialHeader from "./TutorialHeader";
import TutorialLoading from "./TutorialLoading";
import { TutorialStateRoot } from "./TutorialStateRoot";

export default function TutorialRoot({
  config,
  routeElement,
}: {
  config: TutorialConfig;
  routeElement: JsxElement;
}) {
  const { auth } = useAuth();

  return (
    <>
      <TutorialHeader config={config} />
      {/* <TutorialNav config={config} /> */}
      {/* <TutorialSidebar /> */}

      <main className={styles.tutorialMain}>
        <div className={styles.tutorialContent}>
          {(() => {
            switch (auth.status) {
              case "Initial":
              case "Loading":
                return <TutorialLoading />;
              case "LoggedOut":
                return <LoggedOut />;
              case "LoggedIn":
                return (
                  <>
                    {globalParams.mockApi && (
                      <Content>
                        <Prose className={styles.notForCreditAlert}>
                          You’re currently in <strong>preview mode</strong>.
                          Your responses will <strong>not</strong> be saved.
                        </Prose>
                      </Content>
                    )}

                    {!globalParams.mockApi && !auth.isForCredit && (
                      <Content>
                        <Prose className={styles.notForCreditAlert}>
                          This is an anonymous account. Your work will{" "}
                          <strong>not</strong> count for any course credit.
                        </Prose>
                      </Content>
                    )}

                    <TutorialStateRoot
                      config={config}
                      routeElement={routeElement}
                      learner={auth.learner}
                    />
                  </>
                );
            }
          })()}
        </div>
      </main>
    </>
  );
}

function LoggedOut() {
  const router = useRouter();

  return (
    <Content
      className={css`
        text-align: center;
        margin-top: calc(2rem + 10vh);
      `}
    >
      <LockIcon size="medium" />

      <Prose>You must be logged in to see this page.</Prose>

      <Button
        link={`/login?next=${encodeURIComponent(router.asPath)}`}
        className="margin-top"
      >
        Log in <ArrowRightIcon />
      </Button>
    </Content>
  );
}
