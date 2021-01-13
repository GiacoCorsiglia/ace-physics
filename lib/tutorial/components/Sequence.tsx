import React from "react";
import { SequenceConfig } from "../config";
import { CommitAction, isMarkedVisible, nodeKey } from "../section-logic";
import { useTracked } from "../state-tree";
import Section from "./Section";

export default function Sequence({
  config,
  first,
  commit,
}: {
  config: SequenceConfig;
  first: boolean;
  commit: CommitAction;
}) {
  const visibleNodes = useTracked((state) =>
    config.sections.filter((node) => isMarkedVisible(state, node))
  );

  const nodeComponents = visibleNodes.map((node, i) => {
    const key = nodeKey(node);
    const first_ = first && i === 0;

    switch (node.kind) {
      case "section":
        return (
          <Section key={key} config={node} first={first_} commit={commit} />
        );
      case "sequence":
        return (
          <Sequence key={key} config={node} first={first_} commit={commit} />
        );
    }
  });

  return <>{nodeComponents}</>;
}
