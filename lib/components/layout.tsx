import { styled } from "@/helpers/frontend";
import styles from "./layout.module.scss";

type VerticalSpacing = 100 | 300;

export const Content = styled.div<{
  vertical?: VerticalSpacing | false;
}>(({ vertical = 100 }) => [
  styles.content,
  vertical === 100 && styles.vertical100,
  vertical === 300 && styles.vertical300,
]);

export const Vertical = styled.div<{
  space?: VerticalSpacing;
}>(({ space = 100 }) => [
  styles.vertical, // Leave this here to set the displayName
  space === 100 && styles.vertical100,
  space === 300 && styles.vertical300,
]);

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

export const Columns = styled.div(styles.columns);

export const Column = styled.div<{
  vertical?: VerticalSpacing | false;
}>(({ vertical = 100 }) => [
  styles.column, // Leave this here to set the displayName
  vertical === 100 && styles.vertical100,
  vertical === 300 && styles.vertical300,
]);

export const Spacer = styled.span<{
  size: 25 | 50 | 75 | 100;
  block?: boolean;
}>(({ size, block }) => [
  !block && styles.spacerInlineBlock,
  block && styles.spacerBlock,
  size === 25 && styles.spacer25,
  size === 50 && styles.spacer50,
  size === 75 && styles.spacer75,
  size === 100 && styles.spacer25,
]);
