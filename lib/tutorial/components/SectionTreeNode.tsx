import { Html } from "@/helpers/client";
import { NodeConfig } from "../config";
import { CommitAction } from "../section-logic";
import OneOf from "./OneOf";
import Section from "./Section";
import Sequence from "./Sequence";

export default function SectionTreeNode({
  node,
  first,
  prepend,
  enumerateSections,
  commit,
}: {
  node: NodeConfig;
  first: boolean;
  prepend?: Html;
  enumerateSections: boolean;
  commit: CommitAction;
}) {
  switch (node.kind) {
    case "section":
      return (
        <Section
          config={node}
          first={first}
          prepend={first ? prepend : undefined}
          enumerateDefault={enumerateSections}
          commit={commit}
        />
      );
    case "sequence":
      // Conditional Sections should not be enumerated.
      return (
        <Sequence
          config={node}
          first={first}
          prepend={first ? prepend : undefined}
          enumerateSections={false}
          commit={commit}
        />
      );
    case "oneOf":
      // Conditional Sections should not be enumerated.
      return (
        <OneOf
          config={node}
          first={first}
          prepend={first ? prepend : undefined}
          enumerateSections={false}
          commit={commit}
        />
      );
  }
}
