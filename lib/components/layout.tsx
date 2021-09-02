import { styled, styledChild } from "@/helpers/frontend";
import styles from "./layout.module.scss";

type VerticalSpacing = 100 | 200 | 300;

export const Content = styled.div<{
  vertical?: VerticalSpacing | false;
  marginTop?: "none" | "small" | "large";
}>(({ vertical = 100, marginTop = "none" }) => [
  styles.content,
  styles.contentWidth,
  vertical !== false && styles.vertical,
  vertical === 100 && styles.vertical100,
  vertical === 200 && styles.vertical200,
  vertical === 300 && styles.vertical300,
  marginTop === "small" && styles.contentMarginTop,
  marginTop === "large" && styles.contentMarginTopLarge,
]);

export const contentWidthClass = styles.contentWidth;

export const ContentWidth = styledChild(styles.contentWidth);

export const SectionGroup = styled.div([
  styles.sectionGroup,
  styles.content,
  styles.contentWidth,
  styles.vertical100,
]);

export const Section = styled.section<{
  animateIn?: boolean;
  enumerate?: boolean;
  vertical?: VerticalSpacing | false;
}>(({ animateIn, enumerate, vertical = 100 }) => [
  styles.section,
  styles.content,
  styles.contentWidth,
  vertical !== false && styles.vertical,
  vertical === 100 && styles.vertical100,
  vertical === 200 && styles.vertical200,
  vertical === 300 && styles.vertical300,
  animateIn && styles.sectionAnimateIn,
  enumerate && styles.sectionEnumerated,
]);

const VerticalSpace = styledChild<{
  before?: VerticalSpacing | 0;
  after?: VerticalSpacing | 0;
}>(({ before, after }) => [
  styles.verticalSpace, // Leave this here to set the displayName
  before === 0 && styles.verticalSpaceBefore0,
  before === 100 && styles.verticalSpaceBefore100,
  before === 200 && styles.verticalSpaceBefore200,
  before === 300 && styles.verticalSpaceBefore300,
  after === 0 && styles.verticalSpaceAfter0,
  after === 100 && styles.verticalSpaceAfter100,
  after === 200 && styles.verticalSpaceAfter200,
  after === 300 && styles.verticalSpaceBefore300,
]);

export const Vertical = Object.assign(
  styled.div<{
    space?: VerticalSpacing;
  }>(({ space = 100 }) => [
    styles.vertical,
    space === 100 && styles.vertical100,
    space === 200 && styles.vertical200,
    space === 300 && styles.vertical300,
  ]),
  {
    Space: VerticalSpace,
  }
);

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
  vertical === 200 && styles.vertical200,
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
