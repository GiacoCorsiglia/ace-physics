import { useCallback, useEffect, useMemo } from "react";
import { NodeConfig, SectionConfig, sequence } from "../config";
import { isMarkedVisible, nextSectionToReveal } from "../section-logic";
import { useStore } from "../state-tree";
import Sequence from "./Sequence";

export default function SectionTree({
  sections,
  complete,
}: {
  sections: readonly NodeConfig[];
  complete: () => void;
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
      store.transaction((set) => {
        set(["sections", firstSection.name, "status"], "revealed");
      });
    }
  }, [store, rootSequence]);

  const commit = useCallback(
    (section: SectionConfig) => {
      store.transaction((set) => {
        const newState = set(["sections", section.name, "status"], "committed");

        const nextSection = nextSectionToReveal(newState, rootSequence);

        if (nextSection) {
          set(["sections", nextSection.name, "status"], "revealed");
        } else {
          complete();
        }
      });
    },
    [store, rootSequence, complete]
  );

  return <Sequence config={rootSequence} first={true} commit={commit} />;
}
