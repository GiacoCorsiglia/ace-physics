import React from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";
import { useUniqueId } from "src/util";
import styles from "./inputs.module.scss";

export default function Text({
  field,
  label = undefined,
  ...props
}: {
  field: Field<s.StringSchema>;
  label?: React.ReactNode;
} & JSX.IntrinsicElements["input"]) {
  const id = useUniqueId();
  const Container = label ? "label" : "div";

  return (
    <Container htmlFor={label ? `text-${id}` : undefined}>
      {label && <div>{label}</div>}

      <input
        {...props}
        className={styles.input + " " + props.className}
        id={`text-${id}`}
        type="text"
        value={field.value}
        onChange={(e) => field.set(e.target.value)}
      />
    </Container>
  );
}
