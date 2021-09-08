import {
  Button,
  Callout,
  DisableControls,
  Justify,
  Prose,
  SectionBox,
  SectionGroup,
} from "@/components";
import { htmlTitle } from "@/helpers/frontend";
import { isSet, Model, tracker } from "@/reactivity";
import { Tracker } from "@/reactivity/tracker";
import { TutorialSchema } from "@/schema/tutorial";
import * as urls from "@/urls";
import { AlertIcon, ArrowRightIcon } from "@primer/octicons-react";
import Head from "next/head";
import { PretestConfig, TutorialConfig } from "../config";
import { tracked, useRootModel, useTracked } from "../state-tree";
import PretestSection from "./PretestSection";

export default function PretestPage({
  config,
  tutorialConfig,
}: {
  config: PretestConfig;
  tutorialConfig: TutorialConfig;
}) {
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

  const rootModel = useRootModel();
  const models = rootModel.properties.pretest.properties;

  // Begin tracking accessed models.
  const modelsTracker = tracker(models, false);

  return (
    <SectionGroup>
      <Head>
        <title>{htmlTitle("Before You Start")}</title>
      </Head>

      <SectionBox>
        <Prose boldColor="blue">
          <h1>Before You Start</h1>

          <p>
            Here are some quick warm-up questions.{" "}
            <strong>
              If you don’t know all the answers, that’s totally OK.
            </strong>{" "}
            Actually, we expect you may not. Today's tutorial will talk about a
            lot of these concepts!
          </p>
        </Prose>

        <Callout color="blue" iconLeft={<AlertIcon size="large" />}>
          <strong>Work on this page alone</strong> and don’t discuss your
          answers until you’ve moved on to the next page.
        </Callout>

        <Prose boldColor="blue">
          <p>
            <strong>Don‘t spend more than 5 minutes</strong> on this page.
          </p>

          <p>
            <strong>Just do your best!</strong> Answer every question with your
            best guess, and then move on to the tutorial.
          </p>

          <p>Thanks :)</p>
        </Prose>
      </SectionBox>

      <DisableControls when={isDisabled}>
        {/* This config should be stable so we can use the index as the key. */}
        {config.sections.map((section, i) => (
          <PretestSection
            key={i}
            config={section}
            modelsTracker={modelsTracker}
          />
        ))}
      </DisableControls>

      <ContinueSection
        config={config}
        tutorialConfig={tutorialConfig}
        modelsTracker={modelsTracker}
      />
    </SectionGroup>
  );
}

const ContinueSection = tracked(function ContinueSection(
  {
    config,
    tutorialConfig,
    modelsTracker,
  }: {
    config: PretestConfig;
    tutorialConfig: TutorialConfig;
    modelsTracker: Tracker<
      Model<TutorialSchema>["properties"]["pretest"]["properties"]
    >;
  },
  state
) {
  const models = useRootModel().properties.pretest.properties;
  // Never reset, so it captures everything used on every render.
  const accessed = modelsTracker.currentAccessed;
  const optional = new Set(config.continue?.optional);
  const defaultIsContinueAllowed = [...accessed].every(
    (key) => optional.has(key) || isSet(models[key], state.pretest?.[key])
  );
  const allowedFn = config.continue?.allowed;
  const isContinueAllowed = allowedFn
    ? allowedFn(state, defaultIsContinueAllowed)
    : defaultIsContinueAllowed;

  return (
    <SectionBox>
      <Justify end>
        <Button
          color="green"
          link={urls.join(
            urls.Tutorials.link,
            tutorialConfig.link,
            tutorialConfig.pages[0]?.link
          )}
          disabled={!isContinueAllowed}
          disabledExplanation="Please respond to every question before moving on"
        >
          Submit and move on <ArrowRightIcon />
        </Button>
      </Justify>

      <Callout color="blue">
        <strong>Don’t discuss your answers</strong> until you’ve moved on to the
        next page.
      </Callout>
    </SectionBox>
  );
});
