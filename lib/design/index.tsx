export * as colors from "./colors";
export * as fonts from "./fonts";
export * as shadows from "./shadows";
export * as spacing from "./spacing";

export const borderRadius = "0.5rem";

////////////////////////////////////////////////////////////////////////////////
// DEPRECATED:
////////////////////////////////////////////////////////////////////////////////

import { Button } from "@/components";
import { Html, scrollTo } from "@/helpers/frontend";
import { Field, isSet } from "@/state";
import Section from "@/tutorial/components/Section";
import { ChecklistIcon } from "@primer/octicons-react";
import { Commit } from "aws-sdk/clients/codecommit";
import { AnswersSchema } from "common/tutorials";
import { cx } from "linaria";
import React, {
  Children as ReactChildren,
  createContext,
  useContext,
} from "react";
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

const AnswerVisibilityContext = createContext(false);
AnswerVisibilityContext.displayName = "AnswerVisibilityContext";

/** @deprecated */
export function AnswerVisibility({
  field,
  children,
}: { field: Field<AnswersSchema> } & Children) {
  const visible = field.value?.visibility === true;

  return (
    <AnswerVisibilityContext.Provider value={visible}>
      {visible && (
        <Content>
          <Section first>
            <Answer>
              <Prose>
                Scroll down to see our answers to the questions below. They’ll
                be in boxes like this one.
              </Prose>
            </Answer>
          </Section>
        </Content>
      )}

      {children}
    </AnswerVisibilityContext.Provider>
  );
}

/** @deprecated */
export function Answer({
  correct,
  children,
  ...props
}: { correct?: boolean | "undetermined" } & JSX.IntrinsicElements["div"]) {
  if (!useContext(AnswerVisibilityContext)) {
    return null;
  }

  props.className = cx(
    props.className,
    styles.answer,
    (correct === undefined || correct === "undetermined") &&
      styles.undetermined,
    correct === true && styles.correct,
    correct === false && styles.incorrect
  );

  return (
    <div {...props}>
      <span className={styles.answerLabel}>Our Answer:</span>
      {children}
    </div>
  );
}

/** @deprecated */
export function RevealAnswersSection({
  commits,
  field,
}: {
  commits: Commit | Commit[];
  field: Field<AnswersSchema>;
}) {
  const visible = field.value?.visibility === true;

  return (
    <Section commits={commits} noLabel>
      {!visible ? (
        <>
          <Prose className="text-center">
            Alright! You’re done with this page. There’s only one thing left to
            do…
          </Prose>

          <div className="text-center margin-top">
            <Button
              onClick={() => {
                field.properties.visibility.set(true);
                scrollTo(0, 600);
              }}
              kind="tertiary"
              iconFirst
            >
              <ChecklistIcon />
              Show me the answers
            </Button>
          </div>

          <Prose className="text-center">
            Clicking this button will scroll you to the top of the page.
          </Prose>
        </>
      ) : (
        <>
          <TextArea
            // TODO:
            // @ts-ignore
            model={field.properties.reflection}
            minRows={4}
            label={
              <Prose>
                Now that you’ve seen our answers, briefly comment on where they
                agree or disagree with yours, and why. Summarize what you feel
                like you’ve learned, and/or what you’re feeling confused about.
              </Prose>
            }
          />

          <Continue
            commit={field.properties.commit}
            allowed={isSet(field.properties.reflection)}
          />
        </>
      )}
    </Section>
  );
}
