import React from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";
import { classes, useUniqueId } from "src/util";
import styles from "./inputs.module.scss";

export default function Text({
  field,
  label = undefined,
  ...props
}: {
  field: Field<s.StringSchema>;
  label?: React.ReactNode;
} & JSX.IntrinsicElements["input"]) {
  const id = `text-${useUniqueId()}`;

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
          styles.textInput,
          [styles.noLabel, !label],
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
