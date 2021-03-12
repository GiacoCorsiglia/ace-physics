import { styled } from "@/helpers/frontend";
import styles from "./layout.module.scss";

export const Content = styled.div(styles.content);

export const Vertical = styled.div(styles.vertical);

interface HorizontalProps {
  align?: "start" | "end" | "center" | "stretch";
  justify?: "start" | "end" | "center" | "stretch";
}
export const Horizontal = styled.div<HorizontalProps>(({ align, justify }) => [
  styles.horizontal,
  align === "start" && styles.alignStart,
  align === "end" && styles.alignEnd,
  align === "stretch" && styles.alignStretch,
  justify === "center" && styles.justifyCenter,
  justify === "end" && styles.justifyEnd,
  justify === "stretch" && styles.justifyStretch,
]);
