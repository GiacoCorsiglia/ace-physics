import { Callout, Prose, Vertical } from "@/components";
import * as urls from "@/urls";
import { AlertIcon, ClockIcon } from "@primer/octicons-react";
import { useEffect } from "react";
import { PosttestConfig, TutorialConfig } from "../config";
import { useStore, useTracked } from "../state-tree";
import { PreOrPostTestPage } from "./pre-or-post-test-page";

export const PosttestPage = ({
  config,
  tutorialConfig,
}: {
  config: PosttestConfig;
  tutorialConfig: TutorialConfig;
}) => {
  // Disable the post test after it has been submitted.
  const isDisabled = useTracked(
    (state) => state.posttest?.status === "completed"
  );

  const store = useStore();

  // Mark the posttest as revealed if it wasn't already.
  useEffect(() => {
    store.transaction((set) => {
      set(["posttest", "status"], (oldStatus) => oldStatus ?? "revealed");
    });
  }, [store]);

  const continueLink = urls.join(
    urls.Tutorials.link,
    tutorialConfig.link,
    "feedback"
  );

  return (
    <PreOrPostTestPage
      pageTitle="Review"
      config={config}
      getModels={(rootModel) =>
        rootModel.properties.posttest.properties.responses.properties
      }
      getState={(state) => state.posttest?.responses}
      isDisabled={isDisabled}
      isContinueAlwaysAllowed={false}
      continueLink={continueLink}
      onContinue={() => {
        store.transaction((set, initialState) => {
          // Mark the posttest as submitted.
          set(["posttest", "status"], "completed");

          // Save the set of pages that had already been completed when the
          // posttest was submitted.
          const pageNames = Object.keys(
            tutorialConfig.schema.properties.pages.properties
          );
          const completedPages = pageNames.filter(
            (pageName) => initialState.pages?.[pageName]?.status === "completed"
          );
          set(["posttest", "completedPages"], (prev) => prev ?? completedPages);
        });
      }}
      intro={
        <>
          <Prose>
            <h1>Review</h1>

            <p>
              Here are some review questions. We won’t tell you the answers to
              these questions—but if you’re uncertain about any of them, we
              recommend checking in with your instructor. Just do your best!
            </p>
          </Prose>

          {isDisabled && (
            <Callout color="blue" iconLeft={<AlertIcon size="large" />}>
              Please finish the tutorial (click "move on" at the end of every
              page) before completing this review.
            </Callout>
          )}

          {!isDisabled && (
            <Callout color="blue" iconLeft={<AlertIcon size="large" />}>
              <strong>Work on this page alone</strong> and don’t discuss your
              answers.
            </Callout>
          )}
        </>
      }
      timesUpModalTitle="Don’t spend more than 5 minutes here"
      timesUpModalContent={
        <Vertical>
          <Callout color="green" iconLeft={<ClockIcon size="medium" />}>
            You’ve been working on this page for about 5 minutes, so we suggest
            you move on.
          </Callout>

          <Prose>
            If you’re uncertain about these questions—no worries—but we
            recommend you check in with your instructor.
          </Prose>
        </Vertical>
      }
    />
  );
};
