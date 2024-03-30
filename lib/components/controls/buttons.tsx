import { combineRefs, cx, Html } from "@/helpers/client";
import { LinkExternalIcon } from "@primer/octicons-react";
import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";
import { Tooltip, useTooltip } from "../tooltip";
import styles from "./buttons.module.scss";
import { useDisabled } from "./disabled";

type ButtonProps = {
  color: "neutral" | "green" | "blue" | "yellow";
  link?: LinkProps["href"];
  openNewTab?: boolean;
  iconLeft?: Html;
  iconRight?: Html;
  disabledExplanation?: Html;
  size?: "normal" | "small";
} & Omit<
  JSX.IntrinsicElements["button"] & JSX.IntrinsicElements["a"],
  "color" | "href"
>; // forwardRef doesn't work with generics.

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
      size = "normal",
      ...props
    },
    ref,
  ) {
    props.disabled = useDisabled(props);

    const { triggerRef, triggerProps, tooltipProps } =
      useTooltip<HTMLButtonElement>(props.disabled && !!disabledExplanation);

    Object.assign(props, triggerProps);

    (props as any).ref = combineRefs(ref, triggerRef);

    const isExternalLink =
      !!link &&
      typeof link === "string" &&
      (link.startsWith("http:") || link.startsWith("https:")) &&
      new URL(link).origin !== location.origin;
    if (isExternalLink) {
      // Default to opening external links in a new tab, unless explicitly set.
      openNewTab = openNewTab ?? true;
      // Also default to the external link icon.
      iconRight = iconRight ?? <LinkExternalIcon />;
    }

    const colorClass = styles[color];

    const childrenWithIcons = (
      <>
        {iconLeft}
        {children}
        {iconRight}
        {props.disabled && disabledExplanation && (
          <Tooltip
            {...tooltipProps}
            contentClassName={cx(styles.disabledExplanation, colorClass)}
            caretClassName={styles.svgCaret}
          >
            {disabledExplanation}
          </Tooltip>
        )}
      </>
    );

    props.className = cx(
      props.className,
      styles.button,
      iconLeft && styles.iconFirst,
      iconRight && styles.iconLast,
      size === "normal" && styles.normal,
      size === "small" && styles.small,
      colorClass,
    );

    if (!link || props.disabled) {
      return (
        <button {...props} type={props.type || "button"}>
          {childrenWithIcons}
        </button>
      );
    } else if (isExternalLink || openNewTab) {
      return (
        <a
          {...(props as JSX.IntrinsicElements["a"])}
          href={link as string}
          target={openNewTab ? "_blank" : undefined}
          rel={openNewTab ? "noreferrer noopener" : undefined}
        >
          {childrenWithIcons}
        </a>
      );
    } else {
      return (
        <Link {...(props as LinkProps)} href={link}>
          {childrenWithIcons}
        </Link>
      );
    }
  },
);

type LinkButtonProps = JSX.IntrinsicElements["button"] & {
  link?: LinkProps["href"];
};

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  function LinkButton({ children, link, ...props }, ref) {
    props.className = cx(props.className, styles.linkButton);

    if (link && !props.disabled) {
      return (
        <Link {...(props as LinkProps)} href={link}>
          {children}
        </Link>
      );
    }

    return (
      <button {...props} type={props.type || "button"} ref={ref}>
        {children}
      </button>
    );
  },
);
