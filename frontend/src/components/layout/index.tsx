import React from "react";
import { classes } from "src/util";
import styles from "./layout.module.scss";

export function Content<A extends keyof JSX.IntrinsicElements = "div">({
  as = "div" as any,
  columns = false,
  ...props
}: JSX.IntrinsicElements[A] & {
  as?: A;
  columns?: boolean;
}) {
  const As = as as any;
  return (
    <As
      {...props}
      className={classes(
        styles.center,
        [styles.oneColumn, !columns],
        [styles.twoColumn, columns],
        props.className
      )}
    />
  );
}

type Foo = React.ElementType;

export function Column<A extends keyof JSX.IntrinsicElements = "div">({
  as = "div" as any,
  ...props
}: JSX.IntrinsicElements[A] & {
  as?: A;
}) {
  const As = as as any;
  return <As {...props} />;
}
