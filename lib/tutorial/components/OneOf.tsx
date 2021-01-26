import * as globalParams from "@/global-params";
import React from "react";
import { OneOfConfig } from "../config";
import {
  CommitAction,
  isMarkedVisible,
  nodeKey,
  revealedAt,
} from "../section-logic";
import { useTracked } from "../state-tree";
import SectionTreeNode from "./SectionTreeNode";

export default function OneOf({
  config,
  first,
  commit,
}: {
  config: OneOfConfig;
  first: boolean;
  commit: CommitAction;
}) {
  // *Normally*, at most one subNode will be visible at a time, but we'll be
  // safe and display them all.  This way, if the state changes between commits
  // (e.g., someone goes back to edit their answers), a newly relevant section
  // from the oneOf can be displayed.  We sort by revealedAt so that the latest
  // revealed section is always at the bottom.
  const visibleNodes = useTracked((state) =>
    Object.values(config.sections)
      .filter((node) =>
        globalParams.showAllSections ? true : isMarkedVisible(state, node)
      )
      // This array was just created, so we can use the in-place sort.
      .sort(
        (nodeA, nodeB) => revealedAt(state, nodeA) - revealedAt(state, nodeB)
      )
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
