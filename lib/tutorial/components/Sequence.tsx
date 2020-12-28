import React from "react";
import { SequenceConfig } from "../config";
import { CommitAction, isMarkedVisible, nodeKey } from "../section-logic";
import { useTracked } from "../state-tree";
import Section from "./Section";

export default function Sequence({
  config,
  commit,
}: {
  config: SequenceConfig;
  commit: CommitAction;
}) {
  const visibleNodes = useTracked((state) =>
    config.sections.filter((node) => isMarkedVisible(state, node))
  );

  const nodeComponents = visibleNodes.map((node) => {
    const key = nodeKey(node);

    switch (node.kind) {
      case "section":
        return <Section key={key} config={node} commit={commit} />;
      case "sequence":
        return <Sequence key={key} config={node} commit={commit} />;
    }
  });

  return <>{nodeComponents}</>;
}
