import { cx } from "@/helpers/frontend";
import { Children, forwardRef } from "react";
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

type ProseProps = {
  size?: "large" | "body" | "small";
  align?: "left" | "right" | "center" | "justify";
  faded?: boolean;
} & JSX.IntrinsicElements["p"];

export const Prose = forwardRef<HTMLParagraphElement, ProseProps>(
  function Prose({ size = "body", align, faded, ...props }, ref) {
    // If there is no block level element in the children, wrap them in <p>.
    // Otherwise, just wrap everything in a <div>.  (The prop types for "p" and
    // "div" are identical.)
    let Container: "p" | "div" = "p";
    Children.forEach(props.children, (child) => {
      if (child && blockLevelElements.has((child as any).type)) {
        Container = "div";
      }
    });
    return (
      <Container
        {...props}
        className={cx(
          styles.prose,
          // Sizes.
          size === "large" && "text-large",
          size === "body" && "text-body",
          size === "small" && "text-small",
          // Text alignment.
          align === "left" && "text-left",
          align === "center" && "text-center",
          align === "right" && "text-right",
          align === "justify" && "text-justify",
          // Fading.
          faded && "text-faded",
          // Additional classes.
          props.className
        )}
        ref={ref}
      />
    );
  }
);
