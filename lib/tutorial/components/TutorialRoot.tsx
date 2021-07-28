import { useAuth } from "@/auth";
import { Button, Content, Prose, Vertical } from "@/components";
import * as globalParams from "@/global-params";
import { JsxElement } from "@/helpers/frontend";
import { ArrowRightIcon, LockIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";
import React from "react";
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

      <Vertical as="main" space={300}>
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
                    <Content as="section">
                      <Prose className={styles.notForCreditAlert}>
                        You’re currently in <strong>preview mode</strong>. Your
                        responses will <strong>not</strong> be saved.
                      </Prose>
                    </Content>
                  )}

                  {!globalParams.mockApi && !auth.isForCredit && (
                    <Content as="section">
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
      </Vertical>
    </>
  );
}

function LoggedOut() {
  const router = useRouter();

  return (
    <Content className={styles.loggedOut}>
      <LockIcon size="medium" />

      <Prose>You must be logged in to see this page.</Prose>

      <Button
        color="green"
        link={`/login?next=${encodeURIComponent(router.asPath)}`}
        className="margin-top"
      >
        Log in <ArrowRightIcon />
      </Button>
    </Content>
  );
}
