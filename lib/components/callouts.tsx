import { cx, Html, styled } from "@/helpers/frontend";
import { forwardRef } from "react";
import styles from "./callouts.module.scss";

export const Callout = forwardRef<
  HTMLDivElement,
  {
    color: "green" | "blue" | "yellow" | "red" | "neutral";
    title?: Html;
    as?: keyof JSX.IntrinsicElements;
  } & JSX.IntrinsicElements["aside"]
>(function Callout({ as = "aside", color, children, title, ...props }, ref) {
  const As = as as "aside";
  return (
    <As
      {...props}
      className={cx(
        props.className,
        styles.callout,
        color === "green" && styles.green,
        color === "blue" && styles.blue,
        color === "yellow" && styles.yellow,
        color === "red" && styles.red,
        color === "neutral" && styles.neutral
      )}
      ref={ref}
    >
      {title && <CalloutTitle>{title}</CalloutTitle>}

      {children}
    </As>
  );
});

const CalloutTitle = styled.p(styles.calloutTitle);
// Semantic versions.
// export const Info = BlueCallout;
// export const Hint = YellowCallout;
// export const Agree = GreenCallout;
// export const Disagree = RedCallout;

// export const Reminder =
