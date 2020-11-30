import * as s from "common/schema";
import { useState } from "react";
import { Field } from "services/state";
import { classes, useUniqueId } from "services/util";
import { useDisabled } from "./DisableInputs";
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
  const id = `integer-${useUniqueId()}`;

  const [raw, setRaw] = useState(
    field.value !== undefined ? field.value.toString() : ""
  );

  props.disabled = useDisabled(props);

  return (
    <>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        {...props}
        placeholder={
          props.placeholder !== undefined ? props.placeholder : "Integer"
        }
        className={classes(
          styles.numberInput,
          [styles.noLabel, !label],
          props.className
        )}
        id={id}
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
    </>
  );
}
