export { Answer } from "./answers"; // TODO: To keep imports working for now.
export * as colors from "./colors";
export * as fonts from "./fonts";
export * as shadows from "./shadows";
export * as spacing from "./spacing";

export const borderRadius = "0.25rem";

////////////////////////////////////////////////////////////////////////////////
// DEPRECATED:
////////////////////////////////////////////////////////////////////////////////

import { Button } from "@/components";
import * as globalParams from "@/global-params";
import { cx, Html } from "@/helpers/frontend";
import { Field } from "@/state";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  EyeClosedIcon,
  EyeIcon,
} from "@primer/octicons-react";
import * as s from "common/schema";
import { Children as ReactChildren, useEffect, useRef } from "react";
import { Content } from "./layout";
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

/** @deprecated */
type ContinueProps =
  | { link: string; commit?: never }
  | { link?: never; commit: Field<s.BooleanSchema> }
  | { link: string; commit: Field<s.BooleanSchema> };

/** @deprecated */
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

/** @deprecated */
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

/** @deprecated */
type Commit = Field<s.BooleanSchema> | undefined | false;

/** @deprecated */
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

/** @deprecated */
export function Section({
  commits,
  first = false,
  noScroll = false,
  noLabel = false,
  children,
}: {
  commits?: Commit | Commit[];
  first?: boolean;
  noScroll?: boolean;
  noLabel?: boolean;
} & Children) {
  if (globalParams.showAllSections) {
    // Skip the other options
    // Also don't scroll all over the page.
    noScroll = true;
  } else if (!isSectionVisible(commits)) {
    return null;
  }

  return (
    <RevealedSection first={first} noScroll={noScroll} noLabel={noLabel}>
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

/** @deprecated */
function RevealedSection({
  first,
  noScroll,
  noLabel,
  children,
}: { first: boolean; noScroll: boolean; noLabel: boolean } & Children) {
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
      className={classes(
        styles.section,
        [styles.sectionFirst, first],
        [styles.noSectionLabel, noLabel],
        [styles.sectionAnimateIn, !first && !noScroll]
      )}
    >
      {children}
    </section>
  );
}
