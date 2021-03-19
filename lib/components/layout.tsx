import { styled } from "@/helpers/frontend";
import styles from "./layout.module.scss";

export const Content = styled.div(styles.content);

export const Vertical = styled.div<{
  spacing?: 100 | 300;
}>(({ spacing }) => [styles.vertical, spacing === 300 && styles.vertical300]);

export const Horizontal = styled.div<{
  align?: "start" | "end" | "center" | "stretch";
  justify?: "start" | "end" | "center" | "stretch";
}>(({ align, justify }) => [
  styles.horizontal,
  align === "start" && styles.alignStart,
  align === "end" && styles.alignEnd,
  align === "stretch" && styles.alignStretch,
  justify === "center" && styles.justifyCenter,
  justify === "end" && styles.justifyEnd,
  justify === "stretch" && styles.justifyStretch,
]);
