import React, { useState } from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";
import { classes, useUniqueId } from "src/util";
import styles from "./inputs.module.scss";

const decimalPattern = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;

export default function Decimal({
  field,
  label,
  ...props
}: {
  field: Field<s.NumberSchema>;
  label?: React.ReactNode;
} & JSX.IntrinsicElements["input"]) {
  const id = `decimal-${useUniqueId()}`;

  const [raw, setRaw] = useState(
    field.value !== undefined ? field.value.toString() : ""
  );

  return (
    <>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        {...props}
        className={classes(
          styles.numberInput,
          [styles.noLabel, !label],
          props.className
        )}
        id={id}
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
    </>
  );
}
