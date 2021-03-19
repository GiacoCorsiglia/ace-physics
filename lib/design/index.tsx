import { Children, classes, OptionalChildren } from "@/util";
import { cx } from "linaria";
import { Children as ReactChildren } from "react";
import styles from "./structure.module.scss";

// To keep imports working for now.
export { Answer } from "./answers";

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

export function Prose({
  children,
  className,
  noMargin = false,
}: { className?: string; noMargin?: boolean } & OptionalChildren) {
  const Container = containerFor(children);
  return (
    <Container className={classes("prose", className, ["no-margin", noMargin])}>
      {children}
    </Container>
  );
}

export function Help({ children }: Children) {
  return <div className={cx(styles.help, styles.boxAnimateIn)}>{children}</div>;
}

export function Info({ children }: Children) {
  return <div className={styles.info}>{children}</div>;
}

export function Reminder({ children }: Children) {
  return (
    <div className={styles.reminder}>
      <span className={styles.reminderLabel}>Reminder</span>
      {children}
    </div>
  );
}

export function Vocabulary({ children }: Children) {
  return (
    <strong>
      <em>{children}</em>
    </strong>
  );
}

export function Hint({ children }: Children) {
  return <em>Hint: {children}</em>;
}
