import {
  Answer,
  AnswerVisibility,
  Button,
  Callout,
  Justify,
  PageTitle,
  Prose,
  SectionBox,
  TextBox,
} from "@/components";
import { CheatSheet } from "@/components/cheat-sheet";
import { Html, htmlTitle, useScrollIntoView } from "@/helpers/client";
import * as urls from "@/urls";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ChecklistIcon,
  CommentDiscussionIcon,
} from "@primer/octicons-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { PageConfig, TutorialConfig } from "../config";
import { useRootModel, useValue } from "../state-tree";
import { useInstructorMode } from "./mode-manager";
import { SectionTree } from "./section-tree";

export const BodyPage = ({
  config,
  tutorialConfig,
  showWhenComplete,
}: {
  config: PageConfig;
  tutorialConfig: TutorialConfig;
  showWhenComplete?: Html;
}) => {
  const [status, setStatus] = useValue(["pages", config.name, "status"]);

  // Mark this page as revealed if it wasn't already.
  useEffect(() => {
    setStatus((oldStatus) => (!oldStatus ? "revealed" : oldStatus));
  }, [setStatus]);

  const complete = useCallback(() => {
    setStatus((oldStatus) => {
      if (
        config.answers === "provided" &&
        (!oldStatus || oldStatus === "revealed")
      ) {
        return "answersPrompted";
      }

      return "completed";
    });
  }, [config, setStatus]);

  const router = useRouter();
  const currentPath = router.pathname.split("/");
  const currentLink = currentPath[currentPath.length - 1];
  const index = tutorialConfig.pages.findIndex((p) => p.link === currentLink);
  const isFirstPage = index === 0;

  const answersRevealed =
    config.answers === "provided" &&
    (status === "answersRevealed" || status === "completed");

  const { cheatSheet } = config;

  return (
    <AnswerVisibility visible={answersRevealed}>
      <Head>
        <title>
          {htmlTitle(
            typeof config.label === "string"
              ? config.label
              : config.label.title,
          )}
        </title>
      </Head>

      {cheatSheet && <CheatSheet>{cheatSheet.body}</CheatSheet>}

      <SectionTree
        sections={config.sections}
        complete={complete}
        prepend={
          <>
            <PageTitle>
              {typeof config.label === "string"
                ? config.label
                : config.label.html}
            </PageTitle>

            {isFirstPage && (
              <>
                <hr />
                <Callout
                  color="blue"
                  iconLeft={<CommentDiscussionIcon size="large" />}
                >
                  {tutorialConfig.pretest ? "From now on, we" : "We"} encourage
                  you to{" "}
                  <strong>
                    discuss all of your answers with your peers while you work.
                  </strong>
                </Callout>
                <hr />
              </>
            )}

            {answersRevealed && (
              <Answer>
                Scroll down to see our answers to the questions below. They’ll
                be in boxes like this one.
              </Answer>
            )}
          </>
        }
      />

      {config.answers === "provided" && (
        <RevealAnswersSection config={config} complete={complete} />
      )}

      <ContinueToNextPage
        config={config}
        tutorialConfig={tutorialConfig}
        showWhenComplete={showWhenComplete}
      />
    </AnswerVisibility>
  );
};

function ContinueToNextPage({
  config,
  tutorialConfig,
  showWhenComplete,
}: {
  config: PageConfig;
  tutorialConfig: TutorialConfig;
  showWhenComplete?: Html;
}) {
  const pageName = config.name;
  const [status] = useValue(["pages", pageName, "status"]);
  const router = useRouter();

  const scrollRef = useScrollIntoView();

  if (status !== "completed") {
    return null;
  }

  const fullLink = (() => {
    if (showWhenComplete) {
      return "";
    }

    const currentPath = router.pathname.split("/");
    const currentLink = currentPath[currentPath.length - 1];
    const currentPageIndex = tutorialConfig.pages.findIndex(
      ({ link }) => link === currentLink,
    );
    if (process.env.NODE_ENV === "development" && currentPageIndex === -1) {
      throw new Error(`No page found for the current link: ${currentLink}`);
    }
    const nextPage =
      currentPageIndex === -1
        ? undefined
        : tutorialConfig.pages[currentPageIndex + 1];
    const nextLink =
      nextPage?.link ?? (tutorialConfig.posttest ? "review" : "feedback");

    return urls.join(urls.Tutorials.link, tutorialConfig.link, nextLink);
  })();

  return (
    <SectionBox ref={scrollRef}>
      <Prose boldColor="blue">
        Nice job finishing this page!{" "}
        {(() => {
          switch (config.answers) {
            case undefined:
            case "none":
              return (
                <>
                  <strong>We haven't checked any of your answers,</strong> so
                  you may want to check in with an instructor.
                </>
              );
            case "checked-some":
              return (
                <>
                  <strong>We only checked some of your answers,</strong> so you
                  may want to check in with an instructor.
                </>
              );
            case "checked-all":
              return (
                <>
                  We checked all your answers, but we encourage you to keep
                  thinking about these ideas, and to discuss any lingering
                  questions with your peers or instructor.
                </>
              );
            case "provided":
              return (
                <>
                  <strong>
                    Learning doesn’t stop once you’ve seen the answers.
                  </strong>{" "}
                  We encourage you to keep thinking about these ideas, and to
                  discuss any lingering questions with your peers or instructor.
                </>
              );
          }
        })()}
      </Prose>

      {showWhenComplete ? (
        showWhenComplete
      ) : (
        <Justify end>
          <Button color="green" link={fullLink} iconRight={<ArrowRightIcon />}>
            Move on to the next page
          </Button>
        </Justify>
      )}
    </SectionBox>
  );
}

const RevealAnswersSection = ({
  config,
  complete,
}: {
  config: PageConfig;
  complete: () => void;
}) => {
  const instructorMode = useInstructorMode();
  const showAllSections = instructorMode?.showAllSections;

  const models = useRootModel();
  const model =
    models.properties.pages.properties[config.name].properties.answers;

  const [status, setStatus] = useValue(["pages", config.name, "status"]);
  const visible =
    status === "answersPrompted" ||
    status === "answersRevealed" ||
    status === "completed";

  const scrollRef = useScrollIntoView(!showAllSections);

  if (!visible && !showAllSections) {
    return null;
  }

  const showReflection = status === "answersRevealed" || status === "completed";
  const showPrompt =
    status === "answersPrompted" || (showAllSections && !showReflection);

  return (
    <SectionBox ref={scrollRef}>
      {showPrompt && (
        <>
          <Prose justify="center">
            Alright! You’re done with this page. There’s only one thing left to
            do…
          </Prose>

          <Justify center>
            <Button
              onClick={() => {
                setStatus("answersRevealed");
                window.scroll({
                  behavior: "smooth",
                  left: 0,
                  top: 0,
                });
              }}
              color="yellow"
              iconLeft={<ChecklistIcon />}
            >
              Show me the answers
            </Button>
          </Justify>

          <Prose justify="center">
            Clicking this button will scroll you to the top of the page.
          </Prose>
        </>
      )}

      {showReflection && (
        <>
          <TextBox
            model={model.properties.reflection}
            minRows={4}
            label={
              <Prose>
                Now that you’ve seen our answers, briefly comment on where they
                agree or disagree with yours, and why. Summarize what you feel
                like you’ve learned, and/or what you’re feeling confused about.
              </Prose>
            }
          />

          {status !== "completed" && (
            <Justify end>
              <Button
                color="green"
                onClick={() => {
                  complete();
                }}
                iconRight={<ArrowDownIcon />}
              >
                Move on
              </Button>
            </Justify>
          )}
        </>
      )}
    </SectionBox>
  );
};
