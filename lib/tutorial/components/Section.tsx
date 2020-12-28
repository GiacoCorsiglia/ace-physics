import { isSet, tracker } from "@/reactivity";
import { memo } from "react";
import { SectionConfig } from "../config";
import { CommitAction } from "../section-logic";
import { useRootModel, useTracked } from "../state-tree";

export default memo(function Section({
  config,
  commit,
}: {
  config: SectionConfig;
  commit: CommitAction;
}) {
  return useTracked(function S(state) {
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

    return (
      <section>
        {bodyHtml}

        <div>
          {status !== "committed" && (
            <button disabled={!isComplete} onClick={() => commit(config)}>
              {continueLabelHtml || "Move on"}
            </button>
          )}
        </div>
      </section>
    );
  });
});
