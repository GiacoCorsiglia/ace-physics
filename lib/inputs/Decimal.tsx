import { Model, useModel } from "@/reactivity";
import { NumberField } from "@/schema/fields";
import { classes, useUniqueId } from "@/util";
import { useState } from "react";
import { useDisabled } from "./DisableInputs";
import styles from "./inputs.module.scss";

const decimalPattern = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;

export default function Decimal({
  model,
  label,
  ...props
}: {
  model: Model<NumberField>;
  label?: React.ReactNode;
} & JSX.IntrinsicElements["input"]) {
  const [value, setValue] = useModel(model, (newValue) => {
    setRaw(newValue !== undefined ? newValue.toString() : "");
  });

  const id = `decimal-${useUniqueId()}`;

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
          props.placeholder !== undefined ? props.placeholder : "Number"
        }
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
            setValue(undefined);
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
            setValue(undefined);
          } else if (decimalPattern.test(input)) {
            // They've input a valid decimal number (without trailing
            // characters---which is why we don't just test this with
            // `parseFloat()`).
            setRaw(input);
            setValue(parseFloat(input));
          }
          // Otherwise ignore/block additional input, but don't delete anything.
        }}
      />
    </>
  );
}
