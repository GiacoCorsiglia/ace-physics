import { useAuth } from "@/auth";
import {
  Button,
  Callout,
  Content,
  ContentWidth,
  Prose,
  Vertical,
  VerticalSpaceAfter100,
} from "@/components";
import * as globalParams from "@/global-params";
import { JsxElement } from "@/helpers/frontend";
import { ArrowRightIcon, LockIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";
import { TutorialConfig } from "../config";
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
                    <VerticalSpaceAfter100>
                      <ContentWidth>
                        <Callout as="section" color="blue">
                          <Prose>
                            You’re currently in <strong>preview mode</strong>.
                            Your responses will <strong>not</strong> be saved.
                          </Prose>
                        </Callout>
                      </ContentWidth>
                    </VerticalSpaceAfter100>
                  )}

                  {!globalParams.mockApi && !auth.isForCredit && (
                    <VerticalSpaceAfter100>
                      <ContentWidth>
                        <Callout as="section" color="blue">
                          This is an anonymous account. Your work will{" "}
                          <strong>not</strong> count for any course credit.
                        </Callout>
                      </ContentWidth>
                    </VerticalSpaceAfter100>
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
    <Content className="text-center" marginTop="large">
      <LockIcon size="medium" />

      <Prose>You must be logged in to see this page.</Prose>

      <Button
        color="green"
        link={`/login?next=${encodeURIComponent(router.asPath)}`}
      >
        Log in <ArrowRightIcon />
      </Button>
    </Content>
  );
}
