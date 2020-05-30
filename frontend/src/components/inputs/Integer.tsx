import React, { useState } from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";

const integerPattern = /^[+-]?\d+$/;

export default function Integer({
  field,
  ...props
}: { field: Field<s.NumberSchema> } & JSX.IntrinsicElements["input"]) {
  const [raw, setRaw] = useState(
    field.value !== undefined ? field.value.toString() : ""
  );

  return (
    <input
      {...props}
      // Number inputs have wonky behavior; see `Decimal` for details.
      type="text"
      // This should nonetheless trigger the numeric keyboard on mobile.
      inputMode="numeric"
      value={raw}
      onChange={(e) => {
        // See the implementation in `Decimal` for details.
        const input = e.target.value;
        if (input === "") {
          setRaw("");
          field.clear();
        } else if (input === "-" || input === "+") {
          setRaw(input);
          field.clear();
        } else if (integerPattern.test(input)) {
          setRaw(input);
          field.set(parseInt(input));
        }
        // Otherwise ignore/block additional input, but don't delete anything.
      }}
    />
  );
}
