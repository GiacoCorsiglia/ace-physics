import { styled, styledChild } from "@/helpers/frontend";
import styles from "./layout.module.scss";

type VerticalSpacing = 100 | 300;

export const Content = styled.div<{
  vertical?: VerticalSpacing | false;
  marginTop?: "none" | "small" | "large";
}>(({ vertical = 100, marginTop = "none" }) => [
  styles.content,
  styles.contentWidth,
  vertical === 100 && styles.vertical100,
  vertical === 300 && styles.vertical300,
  marginTop === "small" && styles.contentMarginTop,
  marginTop === "large" && styles.contentMarginTopLarge,
]);

export const contentWidthClass = styles.contentWidth;

export const ContentWidth = styledChild(styles.contentWidth);

export const SectionGroup = styled.div(
  styles.sectionGroup,
  styles.content,
  styles.contentWidth,
  styles.vertical100
);

export const Section = styled.section<{
  first?: boolean;
  animateIn?: boolean;
  enumerate?: boolean;
}>(({ first, animateIn, enumerate }) => [
  styles.section,
  styles.content,
  styles.contentWidth,
  styles.vertical100,
  first && styles.sectionFirst,
  animateIn && styles.sectionAnimateIn,
  enumerate && styles.sectionEnumerated,
]);

export const Vertical = styled.div<{
  space?: VerticalSpacing;
}>(({ space = 100 }) => [
  styles.vertical, // Leave this here to set the displayName
  space === 100 && styles.vertical100,
  space === 300 && styles.vertical300,
]);

export const VerticalSpaceAfter100 = styledChild(styles.verticalSpaceAfter100);

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
