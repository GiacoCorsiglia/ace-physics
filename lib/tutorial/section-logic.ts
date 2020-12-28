import { TutorialState } from "@/schema/tutorial";
import { NodeConfig, SectionConfig, SequenceConfig } from "./config";

export type CommitAction = (section: SectionConfig) => void;

export const nodeKey = (node: NodeConfig): string => {
  switch (node.kind) {
    case "section":
      return node.name;
    case "sequence":
      return `sequence(${node.sections.map(nodeKey).join(",")})`;
  }
};

export const nextSectionToReveal = (
  state: TutorialState,
  sequence: SequenceConfig
): SectionConfig | null => {
  const nodes = sequence.sections;
  const responses = state.responses || {};

  const start = lastCommittedNodeIndex(state, nodes) + 1;
  for (let i = start; i < nodes.length; i++) {
    const node = nodes[i];

    const failsCondition = node.when && !node.when(responses, state);
    if (failsCondition && !isMarkedVisible(state, node)) {
      // If it was already marked visible, we should continue in the sequence
      // regardless of visibility logic.
      continue;
    }

    if (node.kind === "section") {
      return node;
    }

    const nextSection = nextSectionToReveal(state, node);
    if (nextSection) {
      return nextSection;
    }
  }

  return null;
};

const lastCommittedNodeIndex = (
  state: TutorialState,
  nodes: NodeConfig[]
): number => {
  const statuses = state.sections || {};
  for (let i = nodes.length; i >= 0; i--) {
    const node = nodes[i];

    const isSectionCommitted =
      node.kind === "section" && statuses[node.name]?.status === "committed";
    const isSequenceCommitted =
      node.kind === "sequence" && nextSectionToReveal(state, node) === null;

    if (isSectionCommitted || isSequenceCommitted) {
      return i;
    }
  }
  return 0;
};

export const isMarkedVisible = (
  state: TutorialState,
  node: NodeConfig
): boolean => {
  const statuses = state.sections || {};
  return node.kind === "section"
    ? statuses[node.name]?.status === "revealed" ||
        statuses[node.name]?.status === "committed"
    : node.sections.some((subNode) => isMarkedVisible(state, subNode));
};
