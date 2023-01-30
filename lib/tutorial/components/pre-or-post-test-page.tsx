import {
  Button,
  Callout,
  DisableControls,
  Horizontal,
  Justify,
  SectionBox,
  SectionGroup,
} from "@/components";
import { CheatSheet } from "@/components/cheat-sheet";
import { Modal } from "@/components/modal";
import { Html, htmlTitle, useTimeout } from "@/helpers/client";
import { isSet, Model } from "@/reactivity";
import { tracker, Tracker } from "@/reactivity/tracker";
import { TutorialSchema, TutorialState } from "@/schema/tutorial";
import { ArrowRightIcon } from "@primer/octicons-react";
import Head from "next/head";
import { useState } from "react";
import { PosttestConfig, PretestConfig } from "../config";
import { tracked, useRootModel } from "../state-tree";
import { PreOrPostTestSection } from "./pre-or-post-test-section";

type Config = PretestConfig | PosttestConfig;

type Models =
  | Model<TutorialSchema>["properties"]["pretest"]["properties"]
  | Model<TutorialSchema>["properties"]["posttest"]["properties"]["responses"]["properties"];

type GetState = (
  state: TutorialState
) =>
  | TutorialState["pretest"]
  | NonNullable<TutorialState["posttest"]>["responses"];

export const PreOrPostTestPage = ({
  pageTitle,
  config,
  getModels,
  getState,
  isDisabled,
  isContinueAlwaysAllowed,
  continueLink,
  onContinue,
  intro,
  timesUpModalTitle,
  timesUpModalContent,
}: {
  pageTitle: string;
  config: Config;
  getModels: (rootModel: Model<TutorialSchema>) => Models;
  getState: GetState;
  isDisabled: boolean;
  isContinueAlwaysAllowed: boolean;
  continueLink: string;
  onContinue?: () => void;
  intro: Html;
  timesUpModalTitle: Html;
  timesUpModalContent: Html;
}) => {
  const [didTimeout, setDidTimeout] = useState(false);

  const models = getModels(useRootModel());

  // Begin tracking accessed models.
  const modelsTracker = tracker(models, false);

  const { cheatSheet } = config;

  return (
    <SectionGroup>
      <Head>
        <title>{htmlTitle(pageTitle)}</title>
      </Head>

      {cheatSheet && <CheatSheet>{cheatSheet.body}</CheatSheet>}

      {!isDisabled && (
        <TimesUpModal
          onTimeout={() => setDidTimeout(true)}
          continueLink={continueLink}
          title={timesUpModalTitle}
          content={timesUpModalContent}
        />
      )}

      <SectionBox>{intro}</SectionBox>

      <DisableControls when={isDisabled}>
        {/* This config should be stable so we can use the index as the key. */}
        {config.sections.map((section, i) => (
          <PreOrPostTestSection
            key={i}
            config={section}
            modelsTracker={modelsTracker}
          />
        ))}
      </DisableControls>

      <ContinueSection
        config={config}
        models={models}
        getState={getState}
        modelsTracker={modelsTracker}
        continueLink={continueLink}
        onContinue={onContinue}
        isAlwaysAllowed={didTimeout || isContinueAlwaysAllowed}
      />
    </SectionGroup>
  );
};

const ContinueSection = tracked(function ContinueSection(
  {
    config,
    models,
    getState,
    modelsTracker,
    continueLink,
    onContinue,
    isAlwaysAllowed,
  }: {
    config: PretestConfig | PosttestConfig;
    models: Models;
    getState: GetState;
    modelsTracker: Tracker<Models>;
    continueLink: string;
    onContinue: (() => void) | undefined;
    isAlwaysAllowed: boolean;
  },
  state
) {
  // Never reset, so it captures everything used on every render.
  const accessed = modelsTracker.currentAccessed;
  const optional = new Set(config.continue?.optional);
  const defaultIsContinueAllowed = [...accessed].every(
    (key) => optional.has(key) || isSet(models[key], getState(state)?.[key])
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
          onClick={onContinue}
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
  title,
  content,
  onTimeout,
  continueLink,
}: {
  title: Html;
  content: Html;
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
      title={title}
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
      {content}
    </Modal>
  );
};
