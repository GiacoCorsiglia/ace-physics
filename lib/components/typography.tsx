import { cx } from "@/helpers/frontend";
import { Children } from "react";
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

export const Prose = (props: JSX.IntrinsicElements["p"]) => {
  // If there is no block level element in the children, wrap them in <p>.
  // Otherwise, just wrap everything in a <div>.  (The prop types for "p" and
  // "div" are identical.)
  let Container: "p" | "div" = "p";
  Children.forEach(props.children, (child) => {
    if (child && blockLevelElements.has((child as any).type)) {
      Container = "div";
    }
  });
  return <Container {...props} className={cx(styles.prose, props.className)} />;
};
