import { cx, forEachChild, Html, styled } from "@/helpers/client";
import { forwardRef, isValidElement, JSXElementConstructor } from "react";
import { Image } from "./image";
import { M, QuantumCircuit } from "./math";
import styles from "./typography.module.scss";

const blockLevelElements = new Set<string | JSXElementConstructor<any>>([
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
  QuantumCircuit,
]);

const proseSafeElements = new Set<string | JSXElementConstructor<any>>([
  ...blockLevelElements,
  "strong",
  "em",
  "i",
  "b",
  "a",
  "img",
  "span",
  M,
  QuantumCircuit,
  Image,
]);

export type ProseProps = {
  size?: "large" | "body" | "small" | "smallest" | "ui" | "ui-small";
  justify?: "left" | "right" | "center" | "flush";
  hyphenate?: boolean;
  boldColor?: "neutral" | "blue" | "green" | "red" | "yellow";
  faded?: boolean;
} & JSX.IntrinsicElements["p"];

const ProseComponent = forwardRef<HTMLParagraphElement, ProseProps>(
  function Prose(
    { size, justify, hyphenate = true, faded, boldColor = "neutral", ...props },
    ref,
  ) {
    // If there is no block level element in the children, wrap them in <p>.
    // Otherwise, just wrap everything in a <div>.  (The prop types for "p" and
    // "div" are identical.)
    let Container: "p" | "div" = "p";
    forEachChild(props.children, (child) => {
      if (Container !== "p" || !isValidElement(child)) {
        return;
      }

      if (
        blockLevelElements.has(child.type) ||
        !proseSafeElements.has(child.type)
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
          props.className,
        )}
        ref={ref}
      />
    );
  },
);

const SubText = styled.p([styles.subText, "text-small", "text-faded"]);

export const Prose = Object.assign(ProseComponent, {
  SubText,
});

export const autoProse = (children: Html, props?: Omit<ProseProps, "ref">) => {
  let empty = true;
  let proseSafe = true;
  forEachChild(children, (child) => {
    if (empty && child) {
      empty = false;
    }
    if (
      proseSafe &&
      isValidElement(child) &&
      !proseSafeElements.has(child.type)
    ) {
      proseSafe = false;
    }
  });
  return !empty && proseSafe ? <Prose {...props}>{children}</Prose> : children;
};

export const PageTitle = styled.h1(styles.pageTitle);

export const Vocabulary = styled.strong(styles.vocabulary);
