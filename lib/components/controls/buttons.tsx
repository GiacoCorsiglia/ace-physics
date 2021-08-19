import { Caret } from "@/components/caret";
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
  disabledExplanation?: Html;
} & Omit<JSX.IntrinsicElements["button"] & JSX.IntrinsicElements["a"], "color">; // forwardRef doesn't work with generics.

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      color,
      link,
      openNewTab,
      children,
      iconLeft,
      iconRight,
      disabledExplanation,
      ...props
    },
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
        {props.disabled && disabledExplanation && (
          <span className={styles.disabledExplanation}>
            <Caret className={styles.svgCaret} />
            {disabledExplanation}
          </span>
        )}
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
    } else if (isExternalLink || openNewTab) {
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

// Thanks, GitHub.
// https://github.com/primer/components/blob/main/src/Caret.tsx

const size = 8;
const a = [-size, 0];
const b = [0, size];
const c = [size, 0];
const triangle = `M${a}L${b}L${c}L${a}Z`;
const line = `M${a}L${b}L${c}`;
const caret = (
  <svg width={size * 2} height={size * 2} className={styles.svgCaret}>
    <g transform={`translate(${[size, size * 2]}) rotate(180)`}>
      <path d={triangle} className={styles.svgTriangle} />
      <path d={line} fill="none" className={styles.svgLine} />
    </g>
  </svg>
);
