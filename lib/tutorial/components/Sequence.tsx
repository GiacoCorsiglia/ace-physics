import React from "react";
import { SequenceConfig } from "../config";
import { CommitAction, isMarkedVisible, nodeKey } from "../section-logic";
import { useTracked } from "../state-tree";
import SectionTreeNode from "./SectionTreeNode";

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

  const nodeComponents = visibleNodes.map((node, i) => (
    <SectionTreeNode
      key={nodeKey(node)}
      node={node}
      first={first && i === 0}
      commit={commit}
    />
  ));

  return <>{nodeComponents}</>;
}
