export { Answer } from "./answers"; // TODO: To keep imports working for now.

////////////////////////////////////////////////////////////////////////////////
// DEPRECATED:
////////////////////////////////////////////////////////////////////////////////

import { cx, Html } from "@/helpers/frontend";
import { Children as ReactChildren } from "react";
import styles from "./structure.module.scss";

/** @deprecated */
interface Children {
  children?: Html;
}
/** @deprecated */
interface OptionalChildren extends Children {}

function containerFor(children: React.ReactNode) {
  // This could be accomplished with map but the types got weird and this avoids
  // looping twice.
  let needsP = true;
  ReactChildren.forEach(children, (child) => {
    if (!child) {
      return;
    }

    switch ((child as any).type) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
      case "ul":
      case "ol":
      case "blockquote":
      case "p":
        needsP = false;
    }
  });

  return needsP ? "p" : "div";
}

/** @deprecated */
export function Prose({
  children,
  className,
  noMargin = false,
}: { className?: string; noMargin?: boolean } & OptionalChildren) {
  const Container = containerFor(children);
  return (
    <Container className={cx("prose", className, noMargin && "no-margin")}>
      {children}
    </Container>
  );
}

/** @deprecated */
export function Help({ children }: Children) {
  return <div className={cx(styles.help, styles.boxAnimateIn)}>{children}</div>;
}

/** @deprecated */
export function Info({ children }: Children) {
  return <div className={styles.info}>{children}</div>;
}

/** @deprecated */
export function Reminder({ children }: Children) {
  return (
    <div className={styles.reminder}>
      <span className={styles.reminderLabel}>Reminder</span>
      {children}
    </div>
  );
}

/** @deprecated */
export function Vocabulary({ children }: Children) {
  return (
    <strong>
      <em>{children}</em>
    </strong>
  );
}

/** @deprecated */
export function Hint({ children }: Children) {
  return <em>Hint: {children}</em>;
}
