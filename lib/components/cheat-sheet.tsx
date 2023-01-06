import { Html, useLocalStorage } from "@/helpers/client";
import { InfoIcon } from "@primer/octicons-react";
import { useId } from "react";
import { Caret } from "./caret";
import styles from "./cheat-sheet.module.scss";
import { Button } from "./controls";
import { autoProse } from "./typography";

export const CheatSheet = ({ children }: { children?: Html }) => {
  const id = `cheat-sheet-${useId()}`;

  // Saving this state in local storage has two effects:
  // 1. It persists your preference for an open/closed cheat sheet across pages.
  // 2. The very first time you see a cheat sheet, it's open.  This way you know
  //    it's there.  Once you close it, we don't bother you with it again unless
  //    you explicity open it---which, presumably, you now know how to do since
  //    you managed to manually close it.
  const [isOpen, setOpen] = useLocalStorage("ace-is-cheat-sheet-open", true);

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.cheatSheet} id={id}>
          <Caret className={styles.svgCaret} />
          {autoProse(children, { size: "smallest" })}
        </div>
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
        <InfoIcon />
      </Button>
    </div>
  );
};
