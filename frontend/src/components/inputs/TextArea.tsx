import React from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";

export default function TextArea({
  field,
  ...props
}: { field: Field<s.StringSchema> } & JSX.IntrinsicElements["textarea"]) {
  return (
    <textarea
      {...props}
      value={field.value}
      onChange={(e) => field.set(e.target.value)}
    />
  );
}
