import { Callout, Prose, Vertical } from "@/components";
import * as urls from "@/urls";
import { AlertIcon, ClockIcon } from "@primer/octicons-react";
import { PosttestConfig, TutorialConfig } from "../config";
import { useTracked } from "../state-tree";
import { PreOrPostTestPage } from "./pre-or-post-test-page";

export const PosttestPage = ({
  config,
  tutorialConfig,
}: {
  config: PosttestConfig;
  tutorialConfig: TutorialConfig;
}) => {
  // TODO: Disable the post test after it has been submitted.
  const isDisabled = useTracked((state) => {
    // Require that every page has been completed before allowing the pretest to
    // be completed.  TODO: This might be heavy handed?
    const pageNames = Object.keys(
      tutorialConfig.schema.properties.pages.properties
    );
    return !pageNames.every(
      (pageName) => state.pages?.[pageName]?.status === "completed"
    );
  });

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
      continueLink={continueLink}
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
