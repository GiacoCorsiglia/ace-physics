import { Html, useUniqueId } from "@/helpers/frontend";
import { cx } from "linaria";
import { useState } from "react";
import { ChoicesConfigUnion } from "./choices";
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
  choices: ChoicesConfigUnion<C>;
  onSelect: (choice: C) => void;
  onDeselect: (choice: C) => void;
} & ToggleCoreProps) {
  const uniqueId = `toggle-${useUniqueId()}`;
  const [focusedChoice, setFocusedChoice] = useState<C>();

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
      aria-labelledby={label ? `${uniqueId}_legend` : undefined}
    >
      {choices.map(([choiceId, choiceLabel]) => (
        <label
          htmlFor={`${choiceId}-${choiceId}`}
          className={cx(
            styles.toggleChoice,
            selected === choiceId && styles.selected,
            disabled && styles.disabled,
            focusedChoice === choiceId && styles.focused
          )}
          key={choiceId + ""}
        >
          <input
            type="radio"
            disabled={disabled}
            className={styles.toggleRadio}
            value={choiceId + ""}
            name={choiceId + ""}
            id={`${uniqueId}-${choiceId}`}
            checked={selected === choiceId}
            onChange={(e) =>
              e.target.checked ? onSelect(choiceId) : onDeselect(choiceId)
            }
            onFocus={() => setFocusedChoice(choiceId)}
            onBlur={() =>
              setFocusedChoice((focused) =>
                focused === choiceId ? undefined : focused
              )
            }
          />
          {choiceLabel}
        </label>
      ))}
    </div>
  );

  const needsWrapper = layout === "vertical" || layout === "grid";

  return (
    <>
      {label && (
        <div className={styles.label} id={`${uniqueId}_legend`}>
          {label}
        </div>
      )}

      {needsWrapper ? <div>{choicesEl}</div> : choicesEl}
    </>
  );
}
