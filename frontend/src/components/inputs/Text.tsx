import React from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";
import { classes, useUniqueId } from "src/util";
import { useDisabled } from "./DisableInputs";
import styles from "./inputs.module.scss";

export default function Text({
  field,
  label = undefined,
  maxWidth = false,
  ...props
}: {
  field: Field<s.StringSchema>;
  label?: React.ReactNode;
  maxWidth?: boolean;
} & JSX.IntrinsicElements["input"]) {
  const id = `text-${useUniqueId()}`;

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
          props.placeholder !== undefined
            ? props.placeholder
            : maxWidth
            ? "Type here"
            : "Type your response here"
        }
        className={classes(
          styles.textInput,
          [styles.noLabel, !label],
          [styles.textInputMaxWidth, maxWidth],
          props.className
        )}
        id={id}
        type="text"
        value={field.value || ""}
        onChange={(e) => field.set(e.target.value)}
      />
    </>
  );
}
