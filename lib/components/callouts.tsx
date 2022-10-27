import { cx, Html } from "@/helpers/client";
import { forwardRef } from "react";
import styles from "./callouts.module.scss";
import { autoProse } from "./typography";

type CalloutProps = {
  title?: Html;
  iconLeft?: Html;
  iconRight?: Html;
  iconAlignment?: "top" | "middle" | "bottom";
  animateIn?: boolean;
} & Omit<JSX.IntrinsicElements["aside"], "title" | "color" | "ref">;

export const Callout = forwardRef<
  HTMLDivElement,
  {
    color: "green" | "blue" | "yellow" | "red" | "neutral";
    as?: keyof JSX.IntrinsicElements;
  } & CalloutProps
>(function Callout(
  {
    as = "aside",
    color,
    children,
    title,
    iconLeft,
    iconRight,
    iconAlignment = "middle",
    animateIn,
    ...props
  },
  ref
) {
  const As = as as "aside";
  return (
    <As
      {...props}
      className={cx(
        props.className,
        styles.callout,
        animateIn && styles.animateIn,
        (iconLeft || iconRight) && styles.hasIcon,
        iconAlignment === "top" && styles.iconTop,
        iconAlignment === "middle" && styles.iconMiddle,
        iconAlignment === "bottom" && styles.iconBottom,
        color === "green" && styles.green,
        color === "blue" && styles.blue,
        color === "yellow" && styles.yellow,
        color === "red" && styles.red,
        color === "neutral" && styles.neutral
      )}
      ref={ref}
    >
      {iconLeft && <div className={styles.iconContainer}>{iconLeft}</div>}
      <div className={styles.content}>
        {title && <p className={styles.calloutTitle}>{title}</p>}
        {autoProse(children)}
      </div>
      {iconRight && <div className={styles.iconContainer}>{iconRight}</div>}
    </As>
  );
});

// Semantic versions.

export const Reminder = ({ ...props }: CalloutProps) => (
  <Callout color="neutral" title="Reminder" {...props} />
);

export const Guidance = {
  Agree: ({ ...props }: CalloutProps) => <Callout color="green" {...props} />,
  Disagree: ({ ...props }: CalloutProps) => <Callout color="red" {...props} />,
  HeadsUp: ({ ...props }: CalloutProps) => <Callout color="blue" {...props} />,
  Hint: ({ ...props }: CalloutProps) => <Callout color="yellow" {...props} />,
  Dynamic: ({
    status,
    ...props
  }: { status: "agree" | "disagree" | "headsUp" } & CalloutProps) => (
    <Callout
      color={
        status === "agree" ? "green" : status === "disagree" ? "red" : "blue"
      }
      {...props}
    />
  ),
  AnimateIn: ({ ...props }: JSX.IntrinsicElements["div"]) => (
    <div {...props} className={cx(props.className, styles.animateIn)} />
  ),
} as const;
