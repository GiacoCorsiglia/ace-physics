import React from "react";
import { classes } from "src/util";
import styles from "./inputs.module.scss";

export default function Button({
  kind = "primary",
  ...props
}: JSX.IntrinsicElements["button"] & {
  kind?: "primary" | "secondary";
}) {
  return (
    <button
      {...props}
      type={props.type || "button"}
      className={classes(
        styles[kind],
        [styles.disabled, props.disabled],
        styles.noLabel,
        props.className
      )}
    >
      {props.children}
    </button>
  );
}
