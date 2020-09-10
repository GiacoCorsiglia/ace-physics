import React from "react";
import { Children, classes } from "src/util";
import styles from "./inputs.module.scss";

export default function FieldGroup({
  grid = false,
  className,
  children,
}: { grid?: boolean | "labelsRight"; className?: string } & Children) {
  return (
    <div
      className={classes(
        className,
        [styles.labelsLeft, grid === true],
        [styles.labelsRight, grid === "labelsRight"]
      )}
    >
      {children}
    </div>
  );
}
