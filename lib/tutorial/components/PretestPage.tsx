import { Button, DisableInputs } from "@/components";
import { Info, Prose } from "@/design";
import { Content } from "@/design/layout";
import styles from "@/design/structure.module.scss";
import { htmlTitle } from "@/helpers";
import { isSet, Model, tracker } from "@/reactivity";
import { Tracker } from "@/reactivity/tracker";
import { TutorialSchema } from "@/schema/tutorial";
import * as urls from "@/urls";
import { AlertIcon, ArrowRightIcon } from "@primer/octicons-react";
import { css, cx } from "linaria";
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
        </Prose>

        <Info>
          <div
            className={css`
              display: flex;
              align-items: center;

              & > * + * {
                margin-left: 1.5rem;
              }
            `}
          >
            <AlertIcon size="large" />

            <Prose noMargin>
              <p
                className={css`
                  font-size: 1.5rem;
                  font-weight: bold;
                `}
              >
                Work on this page alone and don’t discuss your answers until
                you’ve moved on to the next page.
              </p>
            </Prose>
          </div>
        </Info>

        <Prose>
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

          <p>Thanks :)</p>
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
        config={config}
        tutorialConfig={tutorialConfig}
        modelsTracker={modelsTracker}
      />
    </>
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
    <Content as="section" className={styles.section}>
      <div className="text-right">
        <Button
          color="green"
          link={urls.join(
            urls.Tutorials.link,
            tutorialConfig.link,
            tutorialConfig.pages[0]?.link
          )}
          disabled={!isContinueAllowed}
        >
          Submit and move on <ArrowRightIcon />
        </Button>
      </div>

      <Info>
        <Prose>
          <strong>
            Don’t discuss your answers until you’ve moved on to the next page.
          </strong>
        </Prose>
      </Info>
    </Content>
  );
});
