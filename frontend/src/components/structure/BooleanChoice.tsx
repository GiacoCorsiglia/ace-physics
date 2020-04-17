import React, { useState } from "react";
import { classes } from "../../shared/util";
import styles from "./BooleanChoice.module.scss";

export default function BooleanChoice({
  center = false,
}: {
  center?: boolean;
}) {
  const [value, setValue] = useState<boolean>();

  return (
    <div className={classes(styles.root, ["full-width", center])}>
      <button
        className={classes(styles.option, [styles.selected, value === true])}
        onClick={() => setValue(true)}
      >
        Yes
      </button>

      <button
        className={classes(styles.option, [styles.selected, value === false])}
        onClick={() => setValue(false)}
      >
        No
      </button>
    </div>
  );
}
