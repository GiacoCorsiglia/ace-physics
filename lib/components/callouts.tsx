import { cx, Html } from "@/helpers/frontend";
import { forwardRef } from "react";
import styles from "./callouts.module.scss";

export const Callout = forwardRef<
  HTMLDivElement,
  {
    color: "green" | "blue" | "yellow" | "red" | "neutral";
    title?: Html;
    as?: keyof JSX.IntrinsicElements;
    iconLeft?: Html;
    iconRight?: Html;
  } & Omit<JSX.IntrinsicElements["aside"], "title">
>(function Callout(
  { as = "aside", color, children, title, iconLeft, iconRight, ...props },
  ref
) {
  const As = as as "aside";
  return (
    <As
      {...props}
      className={cx(
        props.className,
        styles.callout,
        (iconLeft || iconRight) && styles.hasIcon,
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
        {children}
      </div>
      {iconRight && <div className={styles.iconContainer}>{iconRight}</div>}
    </As>
  );
});

// Semantic versions.
// export const Info = BlueCallout;
// export const Hint = YellowCallout;
// export const Agree = GreenCallout;
// export const Disagree = RedCallout;

// export const Reminder =
