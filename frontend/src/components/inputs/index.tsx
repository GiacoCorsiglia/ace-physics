import React, { useState } from "react";
import { Field } from "src/state";

// Choice.
export { default as Choice } from "./Choice";
// Select.
export { default as Select } from "./Select";
export type { SelectChoices } from "./Select";

// Text.

export function Text({
  field,
  ...props
}: { field: Field<string> } & JSX.IntrinsicElements["input"]) {
  return (
    <input
      {...props}
      type="text"
      value={field.value}
      onChange={(e) => field.set(e.target.value)}
    />
  );
}

export function TextArea({
  field,
  ...props
}: { field: Field<string> } & JSX.IntrinsicElements["textarea"]) {
  return (
    <textarea
      {...props}
      value={field.value}
      onChange={(e) => field.set(e.target.value)}
    />
  );
}

// Numbers.

const integerPattern = /^[+-]?\d+$/;

export function Integer({
  field,
  ...props
}: { field: Field<number> } & JSX.IntrinsicElements["input"]) {
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

const decimalPattern = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;

export function Decimal({
  field,
  ...props
}: { field: Field<number> } & JSX.IntrinsicElements["input"]) {
  const [raw, setRaw] = useState(
    field.value !== undefined ? field.value.toString() : ""
  );

  return (
    <input
      {...props}
      // NOTE: <input type="number" /> is kinda fucked.
      // SEE: https://github.com/facebook/react/issues/1549
      type="text"
      // This should nonetheless trigger the numeric keyboard on mobile.
      inputMode="decimal"
      value={raw}
      onChange={(e) => {
        const input = e.target.value;

        if (input === "") {
          // Well, it's empty.
          setRaw("");
          field.clear();
        } else if (
          input === "." ||
          input === "+" ||
          input === "-" ||
          input === "-." ||
          input === "+."
        ) {
          // They're in the process of inputting or deleting a valid input.
          setRaw(input);
          // But they haven't gotten there yet.
          field.clear();
        } else if (decimalPattern.test(input)) {
          // They've input a valid decimal number (without trailing
          // characters---which is why we don't just test this with
          // `parseFloat()`).
          setRaw(input);
          field.set(parseFloat(input));
        }
        // Otherwise ignore/block additional input, but don't delete anything.
      }}
    />
  );
}
