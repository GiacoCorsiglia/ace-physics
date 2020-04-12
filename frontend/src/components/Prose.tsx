import React from "react";

export default function Prose({ children }: { children?: React.ReactNode }) {
  return <p className="description">{children}</p>;
}

export function Vocabulary({ children }: { children: React.ReactNode }) {
  return (
    <strong>
      <em>{children}</em>
    </strong>
  );
}
