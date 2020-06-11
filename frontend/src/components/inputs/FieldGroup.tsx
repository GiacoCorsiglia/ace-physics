import React from "react";
import { Children, classes } from "src/util";
import styles from "./inputs.module.scss";

export default function FieldGroup({
  grid = false,
  className,
  children,
}: { grid?: boolean; className?: string } & Children) {
  return (
    <div className={classes(className, [styles.labelsLeft, grid])}>
      {children}
    </div>
  );
}
