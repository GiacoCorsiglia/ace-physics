import { Html } from "@/helpers/client";
import { SequenceConfig } from "../config";
import {
  CommitAction,
  isMarkedVisible,
  isVisibleInInstructorMode,
  nodeKey,
} from "../section-logic";
import { useTracked } from "../state-tree";
import { useInstructorMode } from "./mode-manager";
import { SectionTreeNode } from "./section-tree-node";

export const Sequence = ({
  config,
  first,
  prepend,
  enumerateSections,
  commit,
}: {
  config: SequenceConfig;
  first: boolean;
  prepend?: Html;
  enumerateSections: boolean;
  commit: CommitAction;
}) => {
  const instructorMode = useInstructorMode();

  const visibleNodes = useTracked((state) =>
    config.sections.filter((node) =>
      instructorMode?.showAllSections
        ? isVisibleInInstructorMode(state, node)
        : isMarkedVisible(state, node),
    ),
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
