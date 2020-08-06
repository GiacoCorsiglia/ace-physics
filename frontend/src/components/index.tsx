import React, { useContext, useEffect, useRef } from "react";
import * as s from "src/common/schema";
import * as globalParams from "src/globalParams";
import { Field } from "src/state";
import { ReactComponent as ArrowRight } from "src/svgs/arrow-right.svg";
import { Children, classes, OptionalChildren } from "src/util";
import { Button } from "./inputs";
import { Content } from "./layout";
import styles from "./structure.module.scss";

function containerFor(children: React.ReactNode) {
  // This could be accomplished with map but the types got weird and this avoids
  // looping twice.
  let needsP = true;
  React.Children.forEach(children, (child) => {
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
  return <div className={styles.help}>{children}</div>;
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

type ContinueProps =
  | { link: string; commit?: never }
  | { link?: never; commit: Field<s.BooleanSchema> };

export function Continue({
  label = "Move on",
  link,
  commit,
  onClick,
  allowed = true,
  children,
}: {
  onClick?: () => void;
  label?: React.ReactNode;
  allowed?: boolean;
} & ContinueProps &
  OptionalChildren) {
  const globals = useContext(globalParams.Context);

  if (commit && commit.value === true) {
    return null;
  }

  if (process.env.NODE_ENV === "development" && globals.unconditionalMoveOn) {
    allowed = true;
  }

  return (
    <Content className={styles.continue}>
      <Button
        className={styles.button}
        link={link}
        onClick={
          (commit || onClick) &&
          (() => {
            if (commit) {
              commit.set(true);
            }
            if (onClick) {
              onClick();
            }
          })
        }
        disabled={!allowed}
      >
        {label} <ArrowRight />
      </Button>

      {children}
    </Content>
  );
}

export function HelpButton({
  help,
  children,
}: { help: Field<s.BooleanSchema> } & OptionalChildren) {
  if (help.value === true) {
    return null;
  }

  return (
    <Button
      className={styles.button}
      kind="tertiary"
      onClick={() => help.set(true)}
    >
      {children || "Hmm…"}
    </Button>
  );
}

export function Section({
  commits,
  first = false,
  children,
}: {
  commits?: (Field<s.BooleanSchema> | undefined | boolean)[];
  first?: boolean;
} & Children) {
  if (
    commits &&
    commits.some((commit) => commit && commit !== true && !commit.value)
  ) {
    return null;
  }

  return <RevealedSection first={first}>{children}</RevealedSection>;
}

function RevealedSection({ first, children }: { first: boolean } & Children) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (first) {
      // The first section of each part doesn't need to scroll into view.
      return;
    }
    el.current?.scrollIntoView({ behavior: "smooth" });
  }, [first]);

  return (
    <section
      ref={el}
      className={classes(styles.section, [styles.sectionFirst, first])}
    >
      {children}
    </section>
  );
}

////////////////////////////////////
// DEPRECATED:
//////////////////

// Layout.

export function Columns({
  children,
}: Children<React.ReactElement<any, typeof Column>[]>) {
  return <div className={styles.columns}>{children}</div>;
}

export function Column({ children }: OptionalChildren) {
  return <div className={styles.column}>{children}</div>;
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
