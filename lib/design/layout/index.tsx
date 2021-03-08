import { Html } from "@/helpers/frontend";
import { cx } from "linaria";
import Head from "next/head";
import { forwardRef } from "react";
import styles from "./layout.module.scss";

export function Page({ title, children }: { title?: string; children?: Html }) {
  return (
    <>
      {title && (
        <Head>
          <title>{title} | ACEPhysics.net</title>
        </Head>
      )}

      {children}
    </>
  );
}

export function Header(props: JSX.IntrinsicElements["header"]) {
  return <header {...props} />;
}

export const Content = forwardRef(function Content<
  A extends keyof JSX.IntrinsicElements = "div"
>(
  {
    as = "div" as any,
    columns = false,
    ...props
  }: JSX.IntrinsicElements[A] & {
    as?: A;
    columns?: boolean;
  },
  ref: React.ForwardedRef<any>
) {
  const As = as as any;
  return (
    <As
      {...props}
      className={cx(
        styles.center,
        !columns && styles.oneColumn,
        columns && styles.twoColumn,
        props.className
      )}
      ref={ref}
    />
  );
});

export function Column<A extends keyof JSX.IntrinsicElements = "div">({
  as = "div" as any,
  ...props
}: JSX.IntrinsicElements[A] & {
  as?: A;
}) {
  const As = as as any;
  return <As {...props} />;
}

export function Columns<A extends keyof JSX.IntrinsicElements = "div">({
  as = "div" as any,
  ...props
}: JSX.IntrinsicElements[A] & {
  as?: A;
}) {
  const As = as as any;
  return <As {...props} className={cx(styles.columns, props.className)} />;
}

export function Flex<A extends keyof JSX.IntrinsicElements = "div">({
  as = "div" as any,
  ...props
}: JSX.IntrinsicElements[A] & {
  as?: A;
}) {
  const As = as as any;
  return <As {...props} className={cx(styles.flex, props.className)} />;
}
