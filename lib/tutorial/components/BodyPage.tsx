import { Info, Prose } from "@/design";
import { Content } from "@/design/layout";
import styles from "@/design/structure.module.scss";
import { htmlTitle } from "@/helpers";
import { Button } from "@/inputs";
import * as urls from "@/urls";
import { ArrowRightIcon, CommentDiscussionIcon } from "@primer/octicons-react";
import { css, cx } from "linaria";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { PageConfig, TutorialConfig } from "../config";
import { useStore, useValue } from "../state-tree";
import SectionTree from "./SectionTree";

export default function BodyPage({
  config,
  tutorialConfig,
}: {
  config: PageConfig;
  tutorialConfig: TutorialConfig;
}) {
  const store = useStore();

  // Mark this page as revealed if it wasn't already.
  useEffect(() => {
    store.transaction((set) => {
      set(["pages", config.name, "status"], (oldStatus) =>
        !oldStatus ? "revealed" : oldStatus
      );
    });
  }, [store, config]);

  const complete = useCallback(() => {
    store.transaction((set) => {
      set(["pages", config.name, "status"], "completed");
    });
  }, [store, config]);

  const router = useRouter();
  const currentPath = router.pathname.split("/");
  const currentLink = currentPath[currentPath.length - 1];
  const index = tutorialConfig.pages.findIndex((p) => p.link === currentLink);
  const isFirstPage = index === 0;

  return (
    <>
      <Head>
        <title>
          {htmlTitle(
            typeof config.label === "string" ? config.label : config.label.title
          )}
        </title>
      </Head>

      <Content as="section">
        <h1 className="prose">
          {typeof config.label === "string" ? config.label : config.label.html}
        </h1>

        {isFirstPage && (
          <Info>
            <div
              className={css`
                display: flex;
                align-items: center;

                > * + * {
                  margin-left: 1.5rem !important;
                }
              `}
            >
              <CommentDiscussionIcon size="large" />

              <Prose noMargin>
                {tutorialConfig.pretest ? "From now on, we" : "We"} encourage
                you to{" "}
                <strong>
                  discuss all of your answers with your peers immediately before
                  moving on
                </strong>{" "}
                (if you’re working with a group today).
              </Prose>
            </div>
          </Info>
        )}
      </Content>

      <SectionTree sections={config.sections} complete={complete} />

      <ContinueToNextPage config={config} tutorialConfig={tutorialConfig} />
    </>
  );
}

function ContinueToNextPage({
  config,
  tutorialConfig,
}: {
  config: PageConfig;
  tutorialConfig: TutorialConfig;
}) {
  const pageName = config.name;
  const [status] = useValue(["pages", pageName, "status"]);
  const router = useRouter();

  if (status !== "completed") {
    return null;
  }

  const currentPath = router.pathname.split("/");
  const currentLink = currentPath[currentPath.length - 1];
  const currentPageIndex = tutorialConfig.pages.findIndex(
    ({ link }) => link === currentLink
  );
  if (process.env.NODE_ENV === "development" && currentPageIndex === -1) {
    throw new Error(`No page found for the current link: ${currentLink}`);
  }
  const nextPage =
    currentPageIndex === -1
      ? undefined
      : tutorialConfig.pages[currentPageIndex + 1];
  const nextLink = nextPage?.link ?? "feedback";
  const fullLink = urls.join(
    urls.Tutorials.link,
    tutorialConfig.link,
    nextLink
  );

  return (
    <Content
      as="section"
      className={cx(
        styles.section,
        styles.sectionAnimateIn,
        styles.noSectionLabel
      )}
    >
      <Prose>
        Nice job finishing this page!{" "}
        {(() => {
          switch (config.answersChecked) {
            case undefined:
            case "none":
              return (
                <>
                  <strong className="text-blue">
                    We haven't checked any of your answers,
                  </strong>{" "}
                  so you may want to check in with an instructor.
                </>
              );
            case "some":
              return (
                <>
                  <strong className="text-blue">
                    We only checked some of your answers,
                  </strong>{" "}
                  so you may want to check in with an instructor.
                </>
              );
            case "all":
              return (
                <>
                  We checked all your answers, but we encourage you to keep
                  thinking about these ideas, and to discuss any lingering
                  questions with your peers or instructor.
                </>
              );
          }
        })()}
      </Prose>

      <div className="text-right">
        <Button link={fullLink}>
          Move on to the next page <ArrowRightIcon />
        </Button>
      </div>
    </Content>
  );
}
