import React, {
  createContext,
  useContext,
  useState,
  isValidElement,
} from "react";

import { Children, OptionalChildren, classes } from "../../shared/util";

import styles from "./structure.module.scss";
import buttonStyles from "./Buttons.module.scss";

export function Prose({ children }: OptionalChildren) {
  return <p className={styles.prose}>{children}</p>;
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

function Part({ children }: Children) {
  // return ;
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

  return (
    <div className={styles.question}>
      <LabelTag className={styles.label}>{label}.</LabelTag>
      <div className={styles.description}>{children}</div>
    </div>
  );
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
