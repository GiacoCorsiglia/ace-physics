import { cx, Html, styled } from "@/helpers/frontend";
import { Children, forwardRef } from "react";
import { M } from "./math";
import styles from "./typography.module.scss";

const blockLevelElements = new Set([
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "blockquote",
  "p",
]);

const proseSafeElements = new Set([
  ...blockLevelElements,
  "strong",
  "em",
  "i",
  "b",
  "a",
  "img",
  "span",
  M,
]);

type ProseProps = {
  size?: "large" | "body" | "small" | "smallest";
  align?: "left" | "right" | "center" | "justify";
  boldColor?: "neutral" | "blue" | "green" | "red" | "yellow";
  faded?: boolean;
} & JSX.IntrinsicElements["p"];

export const Prose = forwardRef<HTMLParagraphElement, ProseProps>(
  function Prose({ size, align, faded, boldColor = "neutral", ...props }, ref) {
    // If there is no block level element in the children, wrap them in <p>.
    // Otherwise, just wrap everything in a <div>.  (The prop types for "p" and
    // "div" are identical.)
    let Container: "p" | "div" = "p";
    Children.forEach(props.children, (child) => {
      if (
        child &&
        Container === "p" &&
        blockLevelElements.has((child as any).type)
      ) {
        Container = "div";
      }
    });
    return (
      <Container
        {...props}
        className={cx(
          styles.prose,
          // Sizes.
          // We don't set a size by default!
          size === "large" && "text-large",
          size === "body" && "text-body",
          size === "small" && "text-small",
          size === "smallest" && "text-smallest",
          // Text alignment.
          align === "left" && "text-left",
          align === "center" && "text-center",
          align === "right" && "text-right",
          align === "justify" && "text-justify",
          // Fading.
          faded && "text-faded",
          // Bold color.
          boldColor === "blue" && styles.boldColorBlue,
          boldColor === "red" && styles.boldColorRed,
          boldColor === "green" && styles.boldColorGreen,
          boldColor === "yellow" && styles.boldColorYellow,
          // Additional classes.
          props.className
        )}
        ref={ref}
      />
    );
  }
);

export const autoProse = (children: Html) => {
  let wrapInProse = true;
  Children.forEach(children, (child) => {
    if (
      wrapInProse &&
      typeof child === "object" &&
      child !== null &&
      !proseSafeElements.has((child as any).type)
    ) {
      wrapInProse = false;
    }
  });
  return wrapInProse ? <Prose>{children}</Prose> : children;
};

export const PageTitle = styled.h1(styles.pageTitle);

export const Vocabulary = styled.strong(styles.vocabulary);
