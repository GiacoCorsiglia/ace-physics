import { Html, useUniqueId } from "@/helpers/frontend";
import { cx } from "linaria";
import { useState } from "react";
import styles from "./inputs.module.scss";

export interface ToggleCoreProps {
  label?: Html;
  layout?: "horizontal" | "vertical" | "grid";
}

export default function ToggleCore<C>({
  selected,
  choices,
  onSelect,
  onDeselect,
  label,
  layout = "horizontal",
  disabled = false,
}: {
  disabled?: boolean;
  selected: C | undefined;
  choices: readonly {
    readonly value: C;
    readonly label: Html;
  }[];
  onSelect: (choice: C) => void;
  onDeselect: (choice: C) => void;
} & ToggleCoreProps) {
  const id = `toggle-${useUniqueId()}`;
  const [focusedChoice, setFocusedChoice] = useState<{}>();

  const choicesEl = (
    <div
      className={cx(
        styles.toggleChoices,
        !label && styles.noLabel,
        layout === "horizontal" && styles.horizontal,
        layout === "vertical" && styles.vertical,
        layout === "grid" && styles.grid
      )}
      role="group"
      aria-labelledby={label ? `${id}_legend` : undefined}
    >
      {choices.map((choice) => (
        <label
          htmlFor={`${id}-${choice.value}`}
          className={cx(
            styles.toggleChoice,
            selected === choice.value && styles.selected,
            disabled && styles.disabled,
            focusedChoice === choice && styles.focused
          )}
          key={choice.value + ""}
        >
          <input
            type="radio"
            disabled={disabled}
            className={styles.toggleRadio}
            value={choice.value + ""}
            name={id}
            id={`${id}-${choice.value}`}
            checked={selected === choice.value}
            onChange={(e) =>
              e.target.checked
                ? onSelect(choice.value)
                : onDeselect(choice.value)
            }
            onFocus={() => setFocusedChoice(choice)}
            onBlur={() =>
              setFocusedChoice((focused) =>
                focused === choice ? undefined : focused
              )
            }
          />
          {choice.label}
        </label>
      ))}
    </div>
  );

  const needsWrapper = layout === "vertical" || layout === "grid";

  return (
    <>
      {label && (
        <div className={styles.label} id={`${id}_legend`}>
          {label}
        </div>
      )}

      {needsWrapper ? <div>{choicesEl}</div> : choicesEl}
    </>
  );
}
