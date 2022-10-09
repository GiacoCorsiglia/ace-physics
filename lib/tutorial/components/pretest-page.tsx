import {
  Button,
  Callout,
  DisableControls,
  Horizontal,
  Justify,
  Prose,
  SectionBox,
  SectionGroup,
  Vertical,
} from "@/components";
import { Modal } from "@/components/modal";
import { htmlTitle, useTimeout } from "@/helpers/client";
import { isSet, Model, tracker } from "@/reactivity";
import { Tracker } from "@/reactivity/tracker";
import { TutorialSchema } from "@/schema/tutorial";
import * as urls from "@/urls";
import { AlertIcon, ArrowRightIcon, ClockIcon } from "@primer/octicons-react";
import Head from "next/head";
import { useState } from "react";
import { PretestConfig, TutorialConfig } from "../config";
import { tracked, useRootModel, useTracked } from "../state-tree";
import { PretestSection } from "./pretest-section";

export const PretestPage = ({
  config,
  tutorialConfig,
}: {
  config: PretestConfig;
  tutorialConfig: TutorialConfig;
}) => {
  const [didTimeout, setDidTimeout] = useState(false);

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

  const continueLink = urls.join(
    urls.Tutorials.link,
    tutorialConfig.link,
    tutorialConfig.pages[0]?.link
  );

  return (
    <SectionGroup>
      <Head>
        <title>{htmlTitle("Before You Start")}</title>
      </Head>

      {!isDisabled && (
        <TimesUpModal
          onTimeout={() => setDidTimeout(true)}
          continueLink={continueLink}
        />
      )}

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
        modelsTracker={modelsTracker}
        continueLink={continueLink}
        isAlwaysAllowed={didTimeout || isDisabled}
      />
    </SectionGroup>
  );
};

const ContinueSection = tracked(function ContinueSection(
  {
    config,
    modelsTracker,
    continueLink,
    isAlwaysAllowed,
  }: {
    config: PretestConfig;
    modelsTracker: Tracker<
      Model<TutorialSchema>["properties"]["pretest"]["properties"]
    >;
    continueLink: string;
    isAlwaysAllowed: boolean;
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
          link={continueLink}
          disabled={!isContinueAllowed && !isAlwaysAllowed}
          disabledExplanation="Please respond to every question before moving on"
          iconRight={<ArrowRightIcon />}
        >
          Submit and move on
        </Button>
      </Justify>

      <Callout color="blue">
        <strong>Don’t discuss your answers</strong> until you’ve moved on to the
        next page.
      </Callout>
    </SectionBox>
  );
});

const TimesUpModal = ({
  onTimeout,
  continueLink,
}: {
  onTimeout: () => void;
  continueLink: string;
}) => {
  const [isOpen, setOpen] = useState(false);

  useTimeout(() => {
    onTimeout();
    setOpen(true);
  }, 1000 * 60 * 5);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      title="We don’t expect you to know all these answers"
      actions={
        <Horizontal justify="space-between">
          <Button color="yellow" onClick={() => setOpen(false)}>
            Keep working
          </Button>

          <Button
            color="green"
            link={continueLink}
            iconRight={<ArrowRightIcon />}
          >
            Move on
          </Button>
        </Horizontal>
      }
    >
      <Vertical>
        <Callout color="green" iconLeft={<ClockIcon size="medium" />}>
          You’ve been working on this page for about 5 minutes, so we suggest
          you move on.
        </Callout>

        <Prose>
          You don’t need to finish this page, because the tutorial will explore
          similar concepts. Give it a try, and discuss lingering questions with
          your peers or an instructor.
        </Prose>
      </Vertical>
    </Modal>
  );
};
