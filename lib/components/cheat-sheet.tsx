import { Html, useLocalStorage } from "@/helpers/client";
import { InfoIcon, XIcon } from "@primer/octicons-react";
import { useId } from "react";
import { createPortal } from "react-dom";
import { Caret } from "./caret";
import styles from "./cheat-sheet.module.scss";
import { Button } from "./controls";
import { autoProse } from "./typography";

const portalElement =
  typeof window !== "undefined"
    ? document.getElementById("ace-cheat-sheet")
    : null;

export const CheatSheet = ({
  title = "Cheat Sheet",
  children,
}: {
  title?: Html;
  children?: Html;
}) => {
  const id = `cheat-sheet-${useId()}`;

  // Saving this state in local storage has two effects:
  // 1. It persists your preference for an open/closed cheat sheet across pages.
  // 2. The very first time you see a cheat sheet, it's open.  This way you know
  //    it's there.  Once you close it, we don't bother you with it again unless
  //    you explicity open it---which, presumably, you now know how to do since
  //    you managed to manually close it.
  const [isOpen, setOpen] = useLocalStorage(
    "ace-is-cheat-sheet-open",
    true,
    (item) => (typeof item === "boolean" ? item : null),
  );

  if (!portalElement) {
    // Should just be in SSR.
    return null;
  }

  return createPortal(
    <div className={styles.container}>
      {isOpen && (
        <section className={styles.cheatSheet} id={id}>
          <Caret className={styles.svgCaret} />

          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}

            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-expanded={true}
              aria-controls={id}
              aria-label="Hide cheat sheet"
            >
              <XIcon />
            </button>
          </div>

          <div className={styles.content}>
            {autoProse(children, { size: "smallest" })}
          </div>
        </section>
      )}

      <Button
        className={styles.button}
        color="neutral"
        size="small"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={isOpen}
        aria-controls={isOpen ? id : undefined}
        aria-label={isOpen ? "Hide cheat sheet" : "Show cheat sheet"}
      >
        <InfoIcon size="medium" />
      </Button>
    </div>,
    portalElement,
  );
};
