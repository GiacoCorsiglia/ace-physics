import { Model, useModel } from "@/reactivity";
import { NumberField } from "@/schema/fields";
import { classes, useUniqueId } from "@/util";
import { useState } from "react";
import { useDisabled } from "./DisableInputs";
import styles from "./inputs.module.scss";

const integerPattern = /^[+-]?\d+$/;

export default function Integer({
  model,
  label,
  ...props
}: {
  model: Model<NumberField>;
  label?: React.ReactNode;
} & JSX.IntrinsicElements["input"]) {
  const [value, setValue] = useModel(model);

  const id = `integer-${useUniqueId()}`;

  const [raw, setRaw] = useState(value !== undefined ? value.toString() : "");

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
            setValue(undefined);
          } else if (input === "-" || input === "+") {
            setRaw(input);
            setValue(undefined);
          } else if (integerPattern.test(input)) {
            setRaw(input);
            setValue(parseInt(input));
          }
          // Otherwise ignore/block additional input, but don't delete anything.
        }}
      />
    </>
  );
}
