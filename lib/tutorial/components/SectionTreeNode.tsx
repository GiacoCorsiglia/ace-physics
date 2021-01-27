import React from "react";
import { NodeConfig } from "../config";
import { CommitAction } from "../section-logic";
import OneOf from "./OneOf";
import Section from "./Section";
import Sequence from "./Sequence";

export default function SectionTreeNode({
  node,
  first,
  enumerateSections,
  commit,
}: {
  node: NodeConfig;
  first: boolean;
  enumerateSections: boolean;
  commit: CommitAction;
}) {
  switch (node.kind) {
    case "section":
      return (
        <Section
          config={node}
          first={first}
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
          enumerateSections={false}
          commit={commit}
        />
      );
  }
}
