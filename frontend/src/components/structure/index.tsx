import React from "react";
import { Children, OptionalChildren } from "../../shared/util";
import buttonStyles from "./Buttons.module.scss";
import styles from "./structure.module.scss";

function containerFor(children: React.ReactNode) {
  // This could be accomplished with map but the types got weird and this avoids
  // looping twice.
  let hasParagraphs = false;
  React.Children.forEach(children, (child) => {
    if (child && (child as any).type === "p") {
      hasParagraphs = true;
    }
  });

  return hasParagraphs ? "div" : "p";
}

export function Prose({ children }: OptionalChildren) {
  const Container = containerFor(children);
  return <Container className={styles.prose}>{children}</Container>;
}

export function Vocabulary({ children }: Children) {
  return (
    <strong>
      <em>{children}</em>
    </strong>
  );
}

// Layout.

export function Columns({
  children,
}: Children<React.ReactElement<any, typeof Column>[]>) {
  return <div className={styles.columns}>{children}</div>;
}

export function Column({ children }: OptionalChildren) {
  return <div className={styles.column}>{children}</div>;
}

// Buttons.

export function MoveOnButton({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div className={buttonStyles.moveOn}>
      <button disabled={disabled} onClick={disabled ? undefined : onClick}>
        Move On
      </button>
    </div>
  );
}

///

export function Part({ number, children }: { number: number } & Children) {
  return (
    <h2 className={styles.part}>
      <span className={styles.label}>Part&nbsp;{number}</span>
      {children}
    </h2>
  );
}

export function Question({
  label,
  level = "top",
  children,
}: {
  label: string;
  level?: "top" | "sub" | "subsub";
} & Children) {
  const LabelTag = level === "top" ? "h3" : level === "sub" ? "h4" : "h5";
  const Container = containerFor(children);

  return (
    <div className={styles.question}>
      <LabelTag className={styles.label}>{label}.</LabelTag>
      <Container className={styles.description}>{children}</Container>
    </div>
  );
}

export function Hint({ children }: Children) {
  return <em>Hint: {children}</em>;
}

export function Question2({
  index,
  level,
  children,
}: { index: number; level: number } & Children) {
  let subIndex = 0;

  const mappedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    if (child.type !== Question) {
      return child;
    }
    return React.cloneElement(child, {
      index: subIndex,
      level: level + 1,
    });
  });

  return (
    <div>
      <div>{index}</div>

      <div>{mappedChildren}</div>
    </div>
  );
}
