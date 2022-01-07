import {
  cx,
  Html,
  styled,
  useIsomorphicLayoutEffect,
} from "@/helpers/frontend";
import { Children, forwardRef, useRef } from "react";
import { Image } from "./image";
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
  Image,
]);

type ProseProps = {
  size?: "large" | "body" | "small" | "smallest" | "ui" | "ui-small";
  justify?: "left" | "right" | "center" | "flush";
  hyphenate?: boolean;
  boldColor?: "neutral" | "blue" | "green" | "red" | "yellow";
  faded?: boolean;
} & JSX.IntrinsicElements["p"];

export const Prose = forwardRef<HTMLParagraphElement, ProseProps>(
  function Prose(
    { size, justify, hyphenate = true, faded, boldColor = "neutral", ...props },
    ref
  ) {
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
          size === "ui" && "text-ui",
          size === "ui-small" && "text-ui-small",
          // Text alignment.
          justify === "left" && "text-left",
          justify === "center" && "text-center",
          justify === "right" && "text-right",
          justify === "flush" && "text-flush",
          // Hyphenation
          hyphenate && styles.hyphenate,
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
  let empty = true;
  let proseSafe = true;
  Children.forEach(children, (child) => {
    if (empty && child) {
      empty = false;
    }
    if (
      proseSafe &&
      typeof child === "object" &&
      child !== null &&
      !proseSafeElements.has((child as any).type)
    ) {
      proseSafe = false;
    }
  });
  return !empty && proseSafe ? <Prose>{children}</Prose> : children;
};

export const PageTitle = styled.h1(styles.pageTitle);

export const Vocabulary = styled.strong(styles.vocabulary);

export const useActualSiblingCheck = (when: () => boolean, deps: any[]) => {
  const elRef = useRef<HTMLDivElement>(null);
  const classesRef = useRef("");

  useIsomorphicLayoutEffect(() => {
    const el = elRef.current;
    if (!el || !when()) {
      return;
    }
    // If this is display math, determine if this element is the first/last
    // child of its parent *including text nodes* (which CSS is incapable of).
    const firstChild = !el.previousSibling;
    const lastChild = !el.nextSibling;
    classesRef.current = cx(
      firstChild && "prose-actual-first-child",
      lastChild && "prose-actual-last-child"
    );
    el.className += " " + classesRef.current;
  }, deps);

  return [elRef, classesRef.current] as const;
};
