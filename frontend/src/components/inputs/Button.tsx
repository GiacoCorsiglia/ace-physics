import React from "react";
import { classes } from "src/util";
import styles from "./inputs.module.scss";

export default function Button({
  kind = "primary",
  className,
  type,
  disabled,
  ...props
}: JSX.IntrinsicElements["button"] & {
  kind?: "primary" | "secondary";
}) {
  return (
    <button
      {...props}
      type={type || "button"}
      className={classes(className, styles[kind], [styles.disabled, disabled])}
    >
      {props.children}
    </button>
  );
}
