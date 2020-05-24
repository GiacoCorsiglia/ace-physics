import React, { useState } from "react";
import ReactSelect from "react-select";
import { Field } from "src/state";

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
      // Number inputs have wonky behavior; see `Decimal`.
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

// Select.

type PropsType<T extends React.Component> = T extends React.Component<infer P>
  ? P
  : never;

export function Select({
  field,
  choices,
  allowOther = true,
  ...props
}: {
  field: Field<string>;
  choices: Array<{
    value: string;
    label: React.ReactNode;
  }>;
  allowOther?: boolean;
} & PropsType<ReactSelect<{ value: string; label: React.ReactNode }>>) {
  // TODO: Support subtypes of `string` (i.e., literal unions).

  // TODO: Support numerical values.

  // TODO: Support multi-select by checking if the schema is an ArraySchema (or
  // TupleSchema) and setting `props.isMulti = true`, and amending `onChange` to
  // handle this case as well (`selected` should be an array).

  // TODO: Have a specific record schema for selects that includes an `other`
  // property.

  // Set essential props, overriding whatever anyone passed in.
  props.options = choices;

  props.value = choices.find((choice) => choice.value === field.value);
  props.onChange = (selected, meta) => {
    if (selected === null || selected === undefined) {
      field.clear();
    } else {
      field.set((selected as any).value);
    }
  };

  if (allowOther) {
    // TODO: Probably should just use CreatableSelect for this?
    props.inputValue =
      props.value === undefined ? field.value?.toString() : undefined;

    props.onInputChange = (input, meta) => {
      if (meta.action === "input-change") {
        field.set(input);
      }
    };

    props.noOptionsMessage = () => `Other: “${field.value}”`;

    // Immediately hide all options when typing.
    props.filterOption = (_, rawInput) => rawInput !== "";
  }

  // Also set some defaults.
  props.isClearable =
    props.isClearable !== undefined ? props.isClearable : true;

  return <ReactSelect {...props} />;
}
