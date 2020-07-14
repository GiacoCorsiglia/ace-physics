import React from "react";
import { Children, classes } from "src/util";
import styles from "./layout.module.scss";

export function Page({ children }: Children) {
  return <>{children}</>;
}

export function Header(props: JSX.IntrinsicElements["header"]) {
  return <header {...props} />;
}

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

export function Column<A extends keyof JSX.IntrinsicElements = "div">({
  as = "div" as any,
  ...props
}: JSX.IntrinsicElements[A] & {
  as?: A;
}) {
  const As = as as any;
  return <As {...props} />;
}
