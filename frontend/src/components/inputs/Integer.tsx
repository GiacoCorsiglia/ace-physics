import React, { useState } from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";
import { useUniqueId } from "src/util";
import styles from "./inputs.module.scss";

const integerPattern = /^[+-]?\d+$/;

export default function Integer({
  field,
  label,
  ...props
}: {
  field: Field<s.NumberSchema>;
  label?: React.ReactNode;
} & JSX.IntrinsicElements["input"]) {
  const id = useUniqueId();
  const Container = label ? "label" : "div";

  const [raw, setRaw] = useState(
    field.value !== undefined ? field.value.toString() : ""
  );

  return (
    <Container htmlFor={label ? `textarea-${id}` : undefined}>
      {label && <div>{label}</div>}

      <input
        {...props}
        className={styles.input + " " + props.className}
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
    </Container>
  );
}
