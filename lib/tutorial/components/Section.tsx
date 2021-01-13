import { Content } from "@/design/layout";
import styles from "@/design/structure.module.scss";
import { Button } from "@/inputs";
import { isSet, tracker } from "@/reactivity";
import { ArrowDownIcon } from "@primer/octicons-react";
import { cx } from "linaria";
import { useEffect, useRef } from "react";
import { SectionConfig } from "../config";
import { CommitAction } from "../section-logic";
import { tracked, useRootModel } from "../state-tree";

export default tracked(function Section(
  {
    config,
    first,
    commit,
  }: {
    config: SectionConfig;
    first: boolean;
    commit: CommitAction;
  },
  state
) {
  const status = state.sections?.[config.name]?.status;

  const rootModel = useRootModel();
  const models = rootModel.properties.responses.properties;

  const modelsTracker = tracker(models, false);
  const body = config.body;
  const bodyHtml =
    body instanceof Function ? body(modelsTracker.proxy, state) : body;
  const affected = modelsTracker.resetTracking();

  let isComplete = [...affected].every((key) =>
    isSet(models[key], state.responses?.[key])
  );
  const continueAllowed = config.continue?.allowed;
  if (continueAllowed) {
    isComplete = continueAllowed(state, isComplete);
  }

  const continueLabel = config.continue?.label;
  const continueLabelHtml =
    continueLabel instanceof Function ? continueLabel(state) : continueLabel;

  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (first) {
      // The first section on each page doesn't need to scroll into view.
      return;
    }
    el.current?.scrollIntoView({ behavior: "smooth" });
  }, [first]);

  return (
    <section
      className={cx(
        styles.section,
        first && styles.sectionFirst,
        !first && styles.sectionAnimateIn,
        config.noLabel && styles.noSectionLabel
      )}
      ref={el}
    >
      <Content>{bodyHtml}</Content>

      <Content>
        <div className={styles.continue}>
          {status !== "committed" && (
            <Button disabled={!isComplete} onClick={() => commit(config)}>
              {continueLabelHtml || "Move on"} <ArrowDownIcon />
            </Button>
          )}
        </div>

        <p
          className={styles.continueNotAllowedMessage}
          // Use visibility so the layout doesn't jump around.
          style={{ visibility: isComplete ? "hidden" : "visible" }}
        >
          Please respond to every question before moving on.
        </p>
      </Content>
    </section>
  );
});
