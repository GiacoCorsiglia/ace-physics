import { Children, classes } from "@/util";
import styles from "./inputs.module.scss";

export default function FieldGroup({
  grid = false,
  suffixed = false,
  className,
  children,
}: {
  grid?: boolean | "labelsRight";
  suffixed?: boolean;
  className?: string;
} & Children) {
  return (
    <div
      className={classes(
        className,
        [styles.labelsLeft, grid === true],
        [styles.labelsRight, grid === "labelsRight"],
        [styles.suffixed, suffixed]
      )}
    >
      {children}
    </div>
  );
}
