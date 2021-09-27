import { Button, Callout, Guidance, SectionBox, Vertical } from "@/components";
import * as globalParams from "@/global-params";
import { cx, Html, useScrollIntoView } from "@/helpers/frontend";
import { isSet, tracker } from "@/reactivity";
import { ArrowDownIcon, EyeClosedIcon, EyeIcon } from "@primer/octicons-react";
import { GuidanceMessageConfig, SectionConfig } from "../config";
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
  const sectionState = state.sections?.[config.name];
  const status = sectionState?.status;
  const revealedMessages = sectionState?.revealedMessages;

  const rootModel = useRootModel();
  const models = rootModel.properties.responses.properties;

  // We want this section to scroll into view unless it's the first one, or if
  // we're in preview mode.
  const scrollRef = useScrollIntoView(!first && !globalParams.showAllSections);

  // Begin tracking accessed models.
  const modelsTracker = tracker(models, false);

  // Body.
  const body = config.body;
  const bodyHtml =
    body instanceof Function ? body(modelsTracker.proxy, state) : body;

  const hasBody = !!bodyHtml || !!prepend;

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

  // Is the move on button enabled?  By default, every model field accessed in
  // the rendering of the body and hints must be filled out.
  const isComplete = [...affected].every((key) =>
    isSet(models[key], state.responses?.[key])
  );
  const continueAllowed = config.continue?.allowed;
  const isContinueAllowed = continueAllowed
    ? continueAllowed(state, isComplete)
    : isComplete;

  // Should the move on button even be rendered?
  const continueVisible = config.continue?.visible;
  const isContinueVisible =
    status !== "committed" &&
    !revealedMessages?.length &&
    (continueVisible ? continueVisible(state) : true);

  // Label for the move on button.
  const continueLabel = config.continue?.label;
  const continueLabelHtml =
    continueLabel instanceof Function ? continueLabel(state) : continueLabel;

  // Should this section be enumerated?  By default, sections rendered
  // conditionally  (with a `when()` or embedded in sequences or oneOf's) are
  // not enumerated.  Neither is the first section, nor are sections without a
  // body (e.g., just messages).
  const enumerate =
    config.enumerate === undefined
      ? !first && config.when === undefined && hasBody && enumerateDefault
      : config.enumerate;

  return (
    <SectionBox
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
        {isContinueVisible && (
          <Button
            color="green"
            disabled={!isContinueAllowed}
            disabledExplanation="Please respond to every question before moving on."
            onClick={() => {
              commit(config, { skipRemainingMessages: false });
            }}
          >
            {continueLabelHtml || "Move on"} <ArrowDownIcon />
          </Button>
        )}

        <SectionHintButtons config={config} />
      </div>

      {hasBody && config.guidance && <hr className={styles.guidanceHr} />}

      <SectionGuidance config={config} commit={commit} />
    </SectionBox>
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

const SectionGuidance = tracked(function SectionGuidance(
  {
    config,
    commit,
  }: {
    config: SectionConfig;
    commit: CommitAction;
  },
  state
) {
  const guidance = config.guidance;

  if (!guidance) {
    return null;
  }

  const revealedMessages = state.sections?.[
    config.name
  ]?.revealedMessages?.filter(
    // Filter out undefined or invalid message names
    (messageName): messageName is string =>
      !!messageName && !!guidance.messages[messageName]
  );

  if (!revealedMessages || !revealedMessages.length) {
    return null;
  }

  // Identify the latest message, the last one that was revealed.
  const latestMessageName = revealedMessages[revealedMessages.length - 1];
  const latestMessage = guidance.messages[latestMessageName];

  // We'll allow people to move on anyway if they've seen the same message twice
  // or more (which means there is at least one repeat in the list).
  const anyRepeated = revealedMessages.length > new Set(revealedMessages).size;
  const skipAllowed = latestMessage.skipAllowed;
  const isSkipAllowed =
    (skipAllowed ? skipAllowed(state) : false) || anyRepeated;

  // The continue label is set by the last message.
  const continueLabel = latestMessage.continueLabel;
  const continueLabelHtml =
    continueLabel instanceof Function ? continueLabel(state) : continueLabel;
  const continueLabelDefault =
    latestMessage.onContinue === "nextSection" ? "Move on" : "Check in again";

  const sectionStatus = state.sections?.[config.name]?.status;

  return (
    <>
      <Vertical className={styles.guidanceMessages}>
        {revealedMessages.map((messageName, i) => (
          <GuidanceMessage
            // Using the index as the key is necessary here, since we may repeat
            // the same message multiple times.  It should work fine, because we
            // will only ever append to the list of revealedMessages.
            key={i}
            config={guidance.messages[messageName]}
          />
        ))}
      </Vertical>

      {sectionStatus !== "committed" && (
        <div className={cx(styles.continue, styles.guidanceContinue)}>
          <Button
            color="green"
            onClick={() =>
              commit(config, {
                skipRemainingMessages:
                  latestMessage.onContinue === "nextSection",
              })
            }
          >
            {continueLabelHtml || continueLabelDefault} <ArrowDownIcon />
          </Button>

          {isSkipAllowed && latestMessage.onContinue !== "nextSection" && (
            <Button
              color="yellow"
              onClick={() => commit(config, { skipRemainingMessages: true })}
            >
              Move on anyway <ArrowDownIcon />
            </Button>
          )}
        </div>
      )}
    </>
  );
});

const GuidanceMessage = tracked(function GuidanceMessage(
  { config }: { config: GuidanceMessageConfig },
  state
) {
  const body = config.body;
  return (
    <Guidance.AnimateIn>
      {body instanceof Function ? body(state) : body}
    </Guidance.AnimateIn>
  );
});
