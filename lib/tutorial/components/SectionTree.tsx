import { Html } from "@/helpers/client";
import { Setter } from "@/reactivity";
import { TutorialState } from "@/schema/tutorial";
import { useCallback, useEffect, useMemo } from "react";
import { NodeConfig, SectionConfig, sequence } from "../config";
import {
  CommitAction,
  isMarkedVisible,
  nextMessageToReveal,
  nextSectionToReveal,
} from "../section-logic";
import { useStore } from "../state-tree";
import Sequence from "./Sequence";

export default function SectionTree({
  sections,
  complete,
  prepend,
}: {
  sections: readonly NodeConfig[];
  complete: () => void;
  prepend?: Html;
}) {
  const store = useStore();

  const rootSequence = useMemo(() => sequence({ sections }), [sections]);

  // Reveal the very first section if none are already marked visible.
  // (Presumably this is the first time someone views the page.)
  useEffect(() => {
    if (isMarkedVisible(store.state, rootSequence)) {
      return;
    }

    const firstSection = nextSectionToReveal(store.state, rootSequence);

    if (firstSection) {
      store.transaction((set, initialState) => {
        revealSection(initialState, set, firstSection);
      });
    }
  }, [store, rootSequence]);

  const commit: CommitAction = useCallback(
    (
      section: SectionConfig,
      { skipRemainingMessages }: { skipRemainingMessages: boolean }
    ) => {
      store.transaction((set, initialState) => {
        if (!skipRemainingMessages) {
          const nextMessage = nextMessageToReveal(initialState, section);
          if (nextMessage) {
            revealMessage(set, section, nextMessage);
            return;
          }
        }

        const newState = set(["sections", section.name, "status"], "committed");

        const nextSection = nextSectionToReveal(newState, rootSequence);

        if (nextSection) {
          revealSection(initialState, set, nextSection);
        } else {
          complete();
        }
      });
    },
    [store, rootSequence, complete]
  );

  return (
    <Sequence
      config={rootSequence}
      first={true}
      prepend={prepend}
      enumerateSections={true}
      commit={commit}
    />
  );
}

const revealSection = (
  state: TutorialState,
  set: Setter<TutorialState>,
  section: SectionConfig
) => {
  set(["sections", section.name, "status"], "revealed");
  set(["sections", section.name, "revealedAt"], Date.now());

  // If the section doesn't have a body, reveal the first message immediately
  // (if no messages were previously revealed).
  if (
    !section.body &&
    !state.sections?.[section.name]?.revealedMessages?.length
  ) {
    const nextMessage = nextMessageToReveal(state, section);
    if (nextMessage) {
      revealMessage(set, section, nextMessage);
    }
  }
};

const revealMessage = (
  set: Setter<TutorialState>,
  section: SectionConfig,
  message: string
) => {
  set(["sections", section.name, "revealedMessages"], (prevList) =>
    prevList ? prevList.concat(message) : [message]
  );
};
