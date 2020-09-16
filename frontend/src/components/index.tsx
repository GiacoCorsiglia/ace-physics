import {
  ArrowDownIcon,
  ArrowRightIcon,
  EyeClosedIcon,
  EyeIcon,
} from "@primer/octicons-react";
import React, { useEffect, useRef } from "react";
import * as s from "src/common/schema";
import * as globalParams from "src/globalParams";
import { Field } from "src/state";
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

type ContinueProps =
  | { link: string; commit?: never }
  | { link?: never; commit: Field<s.BooleanSchema> }
  | { link: string; commit: Field<s.BooleanSchema> };

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
  const done = !link && commit && commit.value === true;

  if (globalParams.unconditionalMoveOn) {
    allowed = true;
  }

  return (
    <Content>
      <div className={classes(styles.continue, [styles.done, done])}>
        {!done && (
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
            {label} {link ? <ArrowRightIcon /> : <ArrowDownIcon />}
          </Button>
        )}

        {children}
      </div>

      <p
        className={styles.continueNotAllowedMessage}
        // Use visibility so the layout doesn't jump around.
        style={{ visibility: allowed ? "hidden" : "visible" }}
      >
        Please respond to every question before moving on.
      </p>
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

type Commit = Field<s.BooleanSchema> | undefined | false;

function isSectionVisible(commits: Commit | Commit[]): boolean {
  if (!commits) {
    // This includes undefined or false.  If the commit has that value it's
    // a falsy value in the list, which we should ignore just show the section.
    // This allows us to write (bool && commit) in the list.
    return true;
  }
  if (Array.isArray(commits)) {
    // If it's an array of commits, just check every one individually.  Defaults
    // to `true`.
    return commits.every(isSectionVisible);
  }
  // The important case here is `commits.value`.  If that is `true`, then the
  // commit is `true` which probably means the previous "move on" button was
  // clicked, so we should show this section now.  If it's `false` (or, more
  // likely, `undefined`) then we aren't ready to show this section yet.
  return commits.value === true;
}

export function Section({
  commits,
  first = false,
  noScroll = false,
  children,
}: {
  commits?: Commit | Commit[];
  first?: boolean;
  noScroll?: boolean;
} & Children) {
  if (globalParams.showAllSections) {
    // Skip the other options
    // Also don't scroll all over the page.
    noScroll = true;
  } else if (!isSectionVisible(commits)) {
    return null;
  }

  return (
    <RevealedSection first={first} noScroll={noScroll}>
      {globalParams.showAllSections &&
        (isSectionVisible(commits) ? (
          <EyeIcon className={styles.sectionDevNoticeVisible} />
        ) : (
          <EyeClosedIcon className={styles.sectionDevNoticeHidden} />
        ))}
      {children}
    </RevealedSection>
  );
}

function RevealedSection({
  first,
  noScroll,
  children,
}: { first: boolean; noScroll: boolean } & Children) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (first || noScroll) {
      // The first section of each part doesn't need to scroll into view.
      return;
    }
    el.current?.scrollIntoView({ behavior: "smooth" });
  }, [first, noScroll]);

  return (
    <section
      ref={el}
      className={classes(styles.section, [styles.sectionFirst, first])}
    >
      {children}
    </section>
  );
}
