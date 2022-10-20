import {
  Button,
  Callout,
  Guidance,
  Prose,
  SectionBox,
  Vertical,
} from "@/components";
import { Tooltip, useTooltip } from "@/components/tooltip";
import { cx, Html, useScrollIntoView } from "@/helpers/client";
import { isSet, tracker } from "@/reactivity";
import { ArrowDownIcon, EyeClosedIcon, EyeIcon } from "@primer/octicons-react";
import { GuidanceMessageConfig, SectionConfig } from "../config";
import { CommitAction, isMarkedVisible } from "../section-logic";
import { tracked, useRootModel, useStore } from "../state-tree";
import { useInstructorMode } from "./mode-manager";
import styles from "./section.module.scss";

export const Section = tracked(function Section(
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
  const instructorMode = useInstructorMode();
  const showAllSections = instructorMode?.showAllSections;

  const sectionState = state.sections?.[config.name];
  const status = sectionState?.status;
  const revealedMessages = sectionState?.revealedMessages;

  const rootModel = useRootModel();
  const models = rootModel.properties.responses.properties;

  // We want this section to scroll into view unless it's the first one, or if
  // we're in preview mode.
  const scrollRef = useScrollIntoView(!first && !showAllSections);

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
  const affected = modelsTracker.currentAccessed;

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
  let continueLabelHtml =
    continueLabel instanceof Function ? continueLabel(state) : continueLabel;
  continueLabelHtml ||=
    hasBody && config.guidance ? "Let’s check in" : "Move on";

  // Should this section be enumerated?  By default, sections rendered
  // conditionally  (with a `when()` or embedded in sequences or oneOf's) are
  // not enumerated.  Neither is the first section, nor are sections without a
  // body (e.g., just messages).
  const enumerate =
    !config.isLegacy &&
    (config.enumerate ??
      (enumerateDefault && !first && hasBody && config.when === undefined));

  return (
    <SectionBox
      className={cx(
        status !== "committed" && !showAllSections && styles.activeSection
      )}
      animateIn={!first && !showAllSections}
      enumerate={enumerate}
      ref={scrollRef}
      vertical={false}
    >
      {showAllSections && (
        <VisibilitySymbol
          isVisible={isMarkedVisible(state, config)}
          className={styles.sectionVisibilitySymbol}
        />
      )}

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
            iconRight={<ArrowDownIcon />}
          >
            {continueLabelHtml}
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
      {config.hints.map((hintConfigs, i) => {
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
                className={cx(i === 0 && styles.firstHint)}
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
  const showAllMessages = useInstructorMode()?.showAllSections;

  const guidance = config.guidance;

  if (!guidance) {
    return null;
  }

  // If we're showing all messages in instructor mode, indicate which one
  // applies to the currently selected answers (if any).  Since all response
  // state is nullable, it should be safe to call this function even if there
  // are no responses yet.
  // TODO: Figure out how to not subscribe to all `state.responses` here?
  const currentlyVisibleMessage = showAllMessages
    ? guidance.nextMessage(state.responses || {}, state)
    : null;

  const allMessagesHtml = showAllMessages ? (
    <Vertical>
      <Prose size="smallest" faded>
        Available guidance messages:
      </Prose>

      {Object.entries(guidance.messages).map(([key, message]) => (
        <GuidanceMessage
          key={key}
          config={message}
          isNextMessageForInstructorMode={key === currentlyVisibleMessage}
        />
      ))}
    </Vertical>
  ) : null;

  const revealedMessages = state.sections?.[
    config.name
  ]?.revealedMessages?.filter(
    // Filter out undefined or invalid message names
    (messageName): messageName is string =>
      !!messageName && !!guidance.messages[messageName]
  );

  if (!revealedMessages || !revealedMessages.length) {
    if (showAllMessages) {
      return allMessagesHtml;
    }

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
      {showAllMessages && allMessagesHtml}
      {showAllMessages && allMessagesHtml && <hr />}

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
            iconRight={<ArrowDownIcon />}
          >
            {continueLabelHtml || continueLabelDefault}
          </Button>

          {isSkipAllowed && latestMessage.onContinue !== "nextSection" && (
            <Button
              color="yellow"
              onClick={() => commit(config, { skipRemainingMessages: true })}
              iconRight={<ArrowDownIcon />}
            >
              Move on anyway
            </Button>
          )}
        </div>
      )}
    </>
  );
});

const GuidanceMessage = tracked(function GuidanceMessage(
  {
    config,
    isNextMessageForInstructorMode,
  }: {
    config: GuidanceMessageConfig;
    isNextMessageForInstructorMode?: boolean;
  },
  state
) {
  const body = config.body;
  return (
    <div className={styles.guidanceMessageContainer}>
      {isNextMessageForInstructorMode !== undefined && (
        <VisibilitySymbol
          isVisible={isNextMessageForInstructorMode}
          className={styles.guidanceMessageVisibilitySymbol}
        />
      )}

      <Guidance.AnimateIn>
        {body instanceof Function ? body(state) : body}
      </Guidance.AnimateIn>
    </div>
  );
});

const VisibilitySymbol = ({
  isVisible,
  className,
}: {
  isVisible: boolean;
  className?: string;
}) => {
  const { triggerProps, tooltipProps } = useTooltip<HTMLDivElement>();

  return (
    <>
      <div {...triggerProps} className={className}>
        {isVisible ? (
          <EyeIcon className={styles.visibleIcon} />
        ) : (
          <EyeClosedIcon className={styles.hiddenIcon} />
        )}
      </div>

      <Tooltip
        {...tooltipProps}
        contentClassName={styles.visibilityTooltip}
        caretClassName={styles.svgCaret}
        alwaysVisiblyHidden
      >
        {isVisible ? (
          <>
            Students <b>would</b> see this element if their responses were the
            same as yours.
          </>
        ) : (
          <>
            Students <b>would not</b> see this element yet if their responses
            were the same as yours.
          </>
        )}
      </Tooltip>
    </>
  );
};
