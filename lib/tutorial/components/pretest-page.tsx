import { Callout, Prose, Vertical } from "@/components";
import * as urls from "@/urls";
import { AlertIcon, ClockIcon } from "@primer/octicons-react";
import { PretestConfig, TutorialConfig } from "../config";
import { useTracked } from "../state-tree";
import { PreOrPostTestPage } from "./pre-or-post-test-page";

export const PretestPage = ({
  config,
  tutorialConfig,
}: {
  config: PretestConfig;
  tutorialConfig: TutorialConfig;
}) => {
  const isDisabled = useTracked((state) => {
    const sections = state.sections || {};
    for (const sectionName in sections) {
      if (sections.hasOwnProperty(sectionName)) {
        if (sections[sectionName]?.status === "committed") {
          return true;
        }
      }
    }
    return false;
  });

  const continueLink = urls.join(
    urls.Tutorials.link,
    tutorialConfig.link,
    tutorialConfig.pages[0]?.link
  );

  return (
    <PreOrPostTestPage
      pageTitle={"Before You Start"}
      config={config}
      getModels={(rootModel) => rootModel.properties.pretest.properties}
      getState={(state) => state.pretest}
      isDisabled={isDisabled}
      continueLink={continueLink}
      intro={
        <>
          <Prose boldColor="blue">
            <h1>Before You Start</h1>

            <p>
              Here are some warm-up questions.{" "}
              <strong>It’s OK if you don’t know the answers.</strong> We expect
              you may not. Today's tutorial will talk about a lot of these
              concepts!
            </p>
          </Prose>

          <Callout color="blue" iconLeft={<AlertIcon size="large" />}>
            <strong>Work on this page alone</strong> and don’t discuss your
            answers until you’ve moved on to the next page.
          </Callout>

          <Prose boldColor="blue">
            <strong>Don’t spend more than 5 minutes</strong> on this page.
            Answer every question with your best guess, and then move on to the
            tutorial.
          </Prose>
        </>
      }
      timesUpModalTitle="We don’t expect you to know all these answers"
      timesUpModalContent={
        <Vertical>
          <Callout color="green" iconLeft={<ClockIcon size="medium" />}>
            You’ve been working on this page for about 5 minutes, so we suggest
            you move on.
          </Callout>

          <Prose>
            You don’t need to finish this page, because the tutorial will
            explore similar concepts. Give it a try, and discuss lingering
            questions with your peers or an instructor.
          </Prose>
        </Vertical>
      }
    />
  );
};
