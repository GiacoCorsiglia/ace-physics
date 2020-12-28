import { useCallback, useMemo } from "react";
import { PageConfig, SectionConfig, sequence } from "../config";
import { nextSectionToReveal } from "../section-logic";
import { useStore } from "../state-tree";
import Sequence from "./Sequence";

export default function SectionTree({ config }: { config: PageConfig }) {
  const store = useStore();

  const rootSequence = useMemo(
    () =>
      sequence({
        sections: config.sections,
      }),
    [config]
  );

  const commit = useCallback(
    (section: SectionConfig) => {
      store.transaction((set) => {
        const newState = set(["sections", section.name, "status"], "committed");

        const nextSection = nextSectionToReveal(newState, rootSequence);

        if (nextSection) {
          set(["sections", nextSection.name, "status"], "revealed");
        } else {
          // TODO: Page completed!
        }
      });
    },
    [store, rootSequence]
  );

  return <Sequence config={rootSequence} commit={commit} />;
}
