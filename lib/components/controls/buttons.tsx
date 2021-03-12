import { cx, Html } from "@/helpers/frontend";
import { LinkExternalIcon } from "@primer/octicons-react";
import Link from "next/link";
import { forwardRef } from "react";
import styles from "./buttons.module.scss";
import { useDisabled } from "./disabled";

type ButtonProps = {
  color: "green" | "blue" | "yellow";
  link?: string;
  openNewTab?: boolean;
  iconLeft?: Html;
  iconRight?: Html;
} & JSX.IntrinsicElements["button"] &
  JSX.IntrinsicElements["a"]; // forwardRef doesn't work with generics.

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { color, link, openNewTab, children, iconLeft, iconRight, ...props },
    ref
  ) {
    props.disabled = useDisabled(props);

    const isExternalLink =
      !!link && (link.startsWith("http:") || link.startsWith("https:"));
    if (isExternalLink) {
      // Default to opening external links in a new tab, unless explicitly set.
      openNewTab = openNewTab ?? true;
      // Also default to the external link icon.
      iconRight = iconRight ?? <LinkExternalIcon />;
    }

    const childrenWithIcons = (
      <>
        {iconLeft}
        {children}
        {iconRight}
      </>
    );

    props.className = cx(
      props.className,
      styles.button,
      iconLeft && styles.iconFirst,
      iconRight && styles.iconLast,
      color === "green" && styles.green,
      color === "blue" && styles.blue,
      color === "yellow" && styles.yellow
    );

    if (!link || props.disabled) {
      return (
        <button {...props} type={props.type || "button"} ref={ref as any}>
          {childrenWithIcons}
        </button>
      );
    }

    if (isExternalLink || openNewTab) {
      return (
        <a
          {...(props as JSX.IntrinsicElements["a"])}
          href={link}
          target={openNewTab ? "_blank" : undefined}
          rel={openNewTab ? "noreferrer noopener" : undefined}
          ref={ref as any}
        >
          {childrenWithIcons}
        </a>
      );
    } else {
      return (
        <Link href={link}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
          <a {...(props as JSX.IntrinsicElements["a"])} ref={ref as any}>
            {childrenWithIcons}
          </a>
        </Link>
      );
    }
  }
);
