import React from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";

export default function Text({
  field,
  ...props
}: { field: Field<s.StringSchema> } & JSX.IntrinsicElements["input"]) {
  return (
    <input
      {...props}
      type="text"
      value={field.value}
      onChange={(e) => field.set(e.target.value)}
    />
  );
}
