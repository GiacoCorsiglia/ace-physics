import { Prose } from "@/design";
import { Content } from "@/design/layout";
import styles from "@/design/structure.module.scss";
import { htmlTitle } from "@/helpers";
import { Button, DisableInputs } from "@/inputs";
import { isSet, Model, tracker } from "@/reactivity";
import { Tracker } from "@/reactivity/tracker";
import { TutorialSchema } from "@/schema/tutorial";
import * as urls from "@/urls";
import { ArrowRightIcon } from "@primer/octicons-react";
import { cx } from "linaria";
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
    <>
      <Head>
        <title>{htmlTitle("Before You Start")}</title>
      </Head>

      <Content as="section" className={cx(styles.section, styles.sectionFirst)}>
        <Prose>
          <h1>Before You Start</h1>

          <p>
            Here are some quick warm-up questions.{" "}
            <strong className="text-blue">
              If you don’t know all the answers, that’s totally OK.
            </strong>{" "}
            Actually, we expect you may not. Today's tutorial will talk about a
            lot of these concepts!
          </p>

          <p>
            <strong className="text-blue">
              Don‘t spend more than 5 minutes
            </strong>{" "}
            on this page.
          </p>

          <p>
            <strong className="text-blue">Just do your best!</strong> Answer
            every question with your best guess, and then move on to the
            tutorial.
          </p>
        </Prose>
      </Content>

      <DisableInputs when={isDisabled}>
        {/* This config should be stable so we can use the index as the key. */}
        {config.sections.map((section, i) => (
          <PretestSection
            key={i}
            config={section}
            modelsTracker={modelsTracker}
          />
        ))}
      </DisableInputs>

      <ContinueSection
        tutorialConfig={tutorialConfig}
        modelsTracker={modelsTracker}
      />
    </>
  );
}

const ContinueSection = tracked(function ContinueSection(
  {
    tutorialConfig,
    modelsTracker,
  }: {
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
  const isComplete = [...accessed].every((key) =>
    isSet(models[key], state.pretest?.[key])
  );

  return (
    <Content as="section" className={cx(styles.section, "text-right")}>
      <Button
        link={urls.join(
          urls.Tutorials.link,
          tutorialConfig.link,
          tutorialConfig.pages[0]?.link
        )}
        disabled={!isComplete}
      >
        Submit and move on <ArrowRightIcon />
      </Button>
    </Content>
  );
});
