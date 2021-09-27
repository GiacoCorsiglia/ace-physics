import { TutorialState } from "@/schema/tutorial";
import { NodeConfig, SectionConfig } from "./config";

export type CommitAction = (
  section: SectionConfig,
  options: { skipRemainingMessages: boolean }
) => void;

export const nodeKey = (node: NodeConfig): string => {
  switch (node.kind) {
    case "section":
      return node.name;
    case "sequence":
      return `sequence(${node.sections.map(nodeKey).join(",")})`;
    case "oneOf":
      return `oneOf(${Object.values(node.sections).map(nodeKey).join(",")})`;
  }
};

export const nextMessageToReveal = (
  state: TutorialState,
  section: SectionConfig
) => {
  const guidance = section.guidance;
  if (!guidance) {
    return null;
  }
  return guidance.nextMessage(state.responses || {}, state);
};

export const nextSectionToReveal = (
  state: TutorialState,
  node: NodeConfig
): SectionConfig | null => {
  if (!node) {
    // Guard against broken configs.
    return null;
  }

  const responses = state.responses || {};

  const failsCondition = node.when && !node.when(responses, state);
  if (failsCondition && !isMarkedVisible(state, node)) {
    // If it was already marked visible, we should continue with this node
    // regardless of visibility logic.
    return null;
  }

  switch (node.kind) {
    case "section":
      if (node.body) {
        // If there's a body set, we don't care about messages now.  The body
        // will be shown first anyway.
        return node;
      }
      // If there's no body set, we only want to reveal this section if any of
      // the messages will be revealed.  Otherwise we'd be revealing an empty
      // section (ignoring hints).
      const nextMessage = nextMessageToReveal(state, node);
      return nextMessage ? node : null;
    case "sequence": {
      const subNodes = node.sections;
      const start = firstUncommittedNodeIndex(state, subNodes);
      // It's possible for `start` to be over the array length, but that's fine:
      for (let i = start; i < subNodes.length; i++) {
        const nextSection = nextSectionToReveal(state, subNodes[i]);
        if (nextSection) {
          return nextSection;
        }
      }
      return null;
    }
    case "oneOf": {
      const which = node.which(responses, state);
      if (which === null) {
        return null;
      }
      return nextSectionToReveal(state, node.sections[which]);
    }
  }
};

const firstUncommittedNodeIndex = (
  state: TutorialState,
  nodes: readonly NodeConfig[]
): number => {
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (isCommitted(state, nodes[i])) {
      return i + 1;
    }
  }
  return 0;
};

const isCommitted = (state: TutorialState, node: NodeConfig): boolean => {
  switch (node.kind) {
    case "section":
      return state.sections?.[node.name]?.status === "committed";
    case "sequence":
      return nextSectionToReveal(state, node) === null;
    case "oneOf": {
      const next = nextSectionToReveal(state, node);
      if (next) {
        return isCommitted(state, next);
      } else {
        return Object.values(node.sections).some((subNode) =>
          isCommitted(state, subNode)
        );
      }
    }
  }
};

export const isMarkedVisible = (
  state: TutorialState,
  node: NodeConfig
): boolean => {
  switch (node.kind) {
    case "section": {
      const statuses = state.sections || {};
      return (
        statuses[node.name]?.status === "revealed" ||
        statuses[node.name]?.status === "committed"
      );
    }
    case "sequence":
      return node.sections.some((subNode) => isMarkedVisible(state, subNode));
    case "oneOf":
      return Object.values(node.sections).some((subNode) =>
        isMarkedVisible(state, subNode)
      );
  }
};

/**
 * Returns the unix timestamp when the node was first revealed, or
 * Infinity if it never was.
 */
export const revealedAt = (state: TutorialState, node: NodeConfig): number => {
  switch (node.kind) {
    case "section": {
      if (!isMarkedVisible(state, node)) {
        return Infinity;
      }
      return state.sections?.[node.name]?.revealedAt || Infinity;
    }
    case "sequence":
      return Math.min(
        ...node.sections.map((subNode) => revealedAt(state, subNode))
      );
    case "oneOf":
      return Math.min(
        ...Object.values(node.sections).map((subNode) =>
          revealedAt(state, subNode)
        )
      );
  }
};
