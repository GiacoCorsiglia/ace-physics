import React from "react";
import { NodeConfig } from "../config";
import { CommitAction } from "../section-logic";
import OneOf from "./OneOf";
import Section from "./Section";
import Sequence from "./Sequence";

export default function SectionTreeNode({
  node,
  first,
  commit,
}: {
  node: NodeConfig;
  first: boolean;
  commit: CommitAction;
}) {
  switch (node.kind) {
    case "section":
      return <Section config={node} first={first} commit={commit} />;
    case "sequence":
      return <Sequence config={node} first={first} commit={commit} />;
    case "oneOf":
      return <OneOf config={node} first={first} commit={commit} />;
  }
}
