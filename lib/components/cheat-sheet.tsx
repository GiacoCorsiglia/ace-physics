import { Html } from "@/helpers/client";
import { InfoIcon } from "@primer/octicons-react";
import { useId, useState } from "react";
import { Caret } from "./caret";
import styles from "./cheat-sheet.module.scss";
import { Button } from "./controls";
import { autoProse } from "./typography";

export const CheatSheet = ({
  children,
  isInitiallyOpen = false,
}: {
  children?: Html;
  isInitiallyOpen?: boolean;
}) => {
  const id = `cheat-sheet-${useId()}`;

  const [isOpen, setOpen] = useState(isInitiallyOpen);

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
