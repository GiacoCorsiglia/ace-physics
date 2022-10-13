import { Html } from "@/helpers/client";
import { OneOfConfig } from "../config";
import {
  CommitAction,
  isMarkedVisible,
  isVisibleInInstructorMode,
  nodeKey,
  revealedAt,
} from "../section-logic";
import { useTracked } from "../state-tree";
import { useInstructorMode } from "./mode-manager";
import { SectionTreeNode } from "./section-tree-node";

export const OneOf = ({
  config,
  first,
  prepend,
  enumerateSections,
  commit,
}: {
  config: OneOfConfig;
  first: boolean;
  prepend?: Html;
  enumerateSections: boolean;
  commit: CommitAction;
}) => {
  const instructorMode = useInstructorMode();

  // *Normally*, at most one subNode will be visible at a time, but we'll be
  // safe and display them all.  This way, if the state changes between commits
  // (e.g., someone goes back to edit their answers), a newly relevant section
  // from the oneOf can be displayed.  We sort by revealedAt so that the latest
  // revealed section is always at the bottom.
  const visibleNodes = useTracked((state) =>
    Object.values(config.sections)
      .filter((node) =>
        instructorMode?.showAllSections
          ? isVisibleInInstructorMode(state, node)
          : isMarkedVisible(state, node)
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
      prepend={first && i === 0 ? prepend : undefined}
      enumerateSections={enumerateSections}
      commit={commit}
    />
  ));

  return <>{nodeComponents}</>;
};
