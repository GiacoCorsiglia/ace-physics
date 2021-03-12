import { cx, Html } from "@/helpers/frontend";
import { createContext, useContext } from "react";
import styles from "./structure.module.scss";

const AnswerVisibilityContext = createContext(false);
AnswerVisibilityContext.displayName = "AnswerVisibilityContext";

export const AnswerVisibility = ({
  visible,
  children,
}: {
  visible: boolean;
  children?: Html;
}) => (
  <AnswerVisibilityContext.Provider value={visible}>
    {children}
  </AnswerVisibilityContext.Provider>
);

export const Answer = ({
  correct,
  children,
  ...props
}: { correct?: boolean | "undetermined" } & JSX.IntrinsicElements["div"]) => {
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
};
