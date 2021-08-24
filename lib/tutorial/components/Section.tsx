import {
  Button,
  Callout,
  Section as LayoutSection,
  Vertical,
} from "@/components";
import * as globalParams from "@/global-params";
import { Html, useScrollIntoView } from "@/helpers/frontend";
import { isSet, tracker } from "@/reactivity";
import { ArrowDownIcon, EyeClosedIcon, EyeIcon } from "@primer/octicons-react";
import { SectionConfig } from "../config";
import { CommitAction, isMarkedVisible } from "../section-logic";
import { tracked, useRootModel, useStore } from "../state-tree";
import styles from "./Section.module.scss";

export default tracked(function Section(
  {
    config,
    first,
    prepend,
    enumerateDefault,
    commit,
  }: {
    config: SectionConfig;
    first: boolean;
    prepend?: Html;
    enumerateDefault: boolean;
    commit: CommitAction;
  },
  state
) {
  const status = state.sections?.[config.name]?.status;

  const rootModel = useRootModel();
  const models = rootModel.properties.responses.properties;

  // Begin tracking accessed models.
  const modelsTracker = tracker(models, false);

  // Body.
  const body = config.body;
  const bodyHtml =
    body instanceof Function ? body(modelsTracker.proxy, state) : body;

  // Revealed hints.
  const revealedHintsHtml =
    config.hints &&
    config.hints
      .flat()
      .filter(
        ({ name, body }) =>
          state.hints?.[name]?.status === "revealed" && body !== "disable"
      )
      .map(({ name, body }) => (
        <Callout key={name} color="yellow" animateIn>
          {body instanceof Function ? body(modelsTracker.proxy, state) : body}
        </Callout>
      ));

  // End tracking accessed models.
  const affected = modelsTracker.resetTracking();

  let isComplete = [...affected].every((key) =>
    isSet(models[key], state.responses?.[key])
  );
  const continueAllowed = config.continue?.allowed;
  if (continueAllowed) {
    isComplete = continueAllowed(state, isComplete);
  }

  const continueVisible = config.continue?.visible;
  const isContinueVisible = continueVisible ? continueVisible(state) : true;

  const continueLabel = config.continue?.label;
  const continueLabelHtml =
    continueLabel instanceof Function ? continueLabel(state) : continueLabel;

  const scrollRef = useScrollIntoView(!first && !globalParams.showAllSections);

  const enumerate =
    config.enumerate === undefined
      ? !first && config.when === undefined && enumerateDefault
      : config.enumerate;

  return (
    <LayoutSection
      animateIn={!first && !globalParams.showAllSections}
      enumerate={enumerate}
      ref={scrollRef}
      vertical={false}
    >
      {globalParams.showAllSections &&
        (isMarkedVisible(state, config) ? (
          <EyeIcon className={styles.previewNoticeVisible} />
        ) : (
          <EyeClosedIcon className={styles.previewNoticeHidden} />
        ))}

      <Vertical>
        {prepend}

        {bodyHtml}
      </Vertical>

      <Vertical className={styles.hintsVertical}>{revealedHintsHtml}</Vertical>

      <div className={styles.continue}>
        {isContinueVisible && status !== "committed" && (
          <Button
            color="green"
            disabled={!isComplete}
            disabledExplanation="Please respond to every question before moving on."
            onClick={() => commit(config)}
          >
            {continueLabelHtml || "Move on"} <ArrowDownIcon />
          </Button>
        )}

        <SectionHintButtons config={config} />
      </div>
    </LayoutSection>
  );
});

const SectionHintButtons = tracked(function SectionHintButtons(
  { config }: { config: SectionConfig },
  state
) {
  const store = useStore();

  if (!config.hints) {
    return null;
  }

  return (
    <>
      {config.hints.map((hintConfigs) => {
        const arr = Array.isArray(hintConfigs) ? hintConfigs : [hintConfigs];

        for (const { name, when, label } of arr) {
          if (state.hints?.[name]?.status === "revealed") {
            // Don't show the help button if the hint has already been revealed.
            continue;
          }
          // Otherwise show the first one that is eligible.
          if (!when || when(state.responses || {}, state)) {
            return (
              <Button
                key={name}
                color="yellow"
                onClick={() =>
                  store.transaction((set) =>
                    set(["hints", name, "status"], "revealed")
                  )
                }
              >
                {label || "Hmm…"}
              </Button>
            );
          }
        }

        return null;
      })}
    </>
  );
});
