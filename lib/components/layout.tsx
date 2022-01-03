import { styled, styledChild } from "@/helpers/css";
import styles from "./layout.module.scss";

////////////////////////////////////////////////////////////////////////////////
// Vertical.
////////////////////////////////////////////////////////////////////////////////

type VerticalSpacing = 100 | 200 | 300;

const verticalCss = (space?: VerticalSpacing | false) =>
  space !== false
    ? [
        styles.vertical,
        space === 100 && styles.vertical100,
        space === 200 && styles.vertical200,
        space === 300 && styles.vertical300,
      ]
    : [];

const VerticalSpace = styledChild<{
  before?: VerticalSpacing | 0;
  after?: VerticalSpacing | 0;
}>(({ before, after }) => [
  styles.verticalSpace, // Leave this here to set the displayName.
  before === 0 && styles.verticalSpaceBefore0,
  before === 100 && styles.verticalSpaceBefore100,
  before === 200 && styles.verticalSpaceBefore200,
  before === 300 && styles.verticalSpaceBefore300,
  after === 0 && styles.verticalSpaceAfter0,
  after === 100 && styles.verticalSpaceAfter100,
  after === 200 && styles.verticalSpaceAfter200,
  after === 300 && styles.verticalSpaceAfter300,
]);

export const Vertical = Object.assign(
  styled.div<{
    space?: VerticalSpacing;
  }>(
    ({ space = 100 }) => [...verticalCss(space), styles.contentBoxSubgrid],
    undefined,
    "Vertical"
  ),
  {
    Space: VerticalSpace,
  }
);

////////////////////////////////////////////////////////////////////////////////
// Horizontal.
////////////////////////////////////////////////////////////////////////////////

export const Horizontal = styled.div<{
  align?: "start" | "end" | "center" | "stretch";
  justify?: "start" | "end" | "center" | "stretch" | "space-between";
}>(({ align, justify }) => [
  styles.horizontal,
  align === "start" && styles.alignStart,
  align === "end" && styles.alignEnd,
  align === "stretch" && styles.alignStretch,
  justify === "center" && styles.justifyCenter,
  justify === "end" && styles.justifyEnd,
  justify === "stretch" && styles.justifyStretch,
  justify === "space-between" && styles.justifySpaceBetween,
]);

////////////////////////////////////////////////////////////////////////////////
// Columns.
////////////////////////////////////////////////////////////////////////////////

export const Columns = styled.div(styles.columns);

export const Column = styled.div<{
  vertical?: VerticalSpacing | false;
}>(({ vertical = 100 }) => [
  styles.column, // Leave this here to set the displayName.
  ...verticalCss(vertical),
]);

////////////////////////////////////////////////////////////////////////////////
// Content Boxes.
////////////////////////////////////////////////////////////////////////////////

export const MainContentBox = styled.main<{
  vertical?: VerticalSpacing | false;
  marginTop?: "none" | "small" | "large";
}>(({ vertical = 100, marginTop = "none" }) => [
  styles.mainContentBox,
  marginTop === "small" && styles.contentMarginTop,
  marginTop === "large" && styles.contentMarginTopLarge,
  ...verticalCss(vertical),
]);

export const SectionBox = styled.section<{
  animateIn?: boolean;
  enumerate?: boolean;
  vertical?: VerticalSpacing | false;
}>(({ animateIn, enumerate, vertical = 100 }) => [
  styles.section,
  animateIn && styles.sectionAnimateIn,
  enumerate && styles.sectionEnumerated,
  ...verticalCss(vertical),
]);

export const SectionGroup = styled.div(styles.sectionGroup);

export const Justify = styledChild<{
  center?: true;
  end?: true;
  stretch?: true;
}>(({ center, end, stretch }) => [
  center && styles.justifySelfCenter,
  end && styles.justifySelfEnd,
  stretch && styles.justifySelfStretch,
]);

export const ApplyContentBox = styledChild([
  styles.contentBoxCentered,
  styles.contentBoxGrid,
]);
