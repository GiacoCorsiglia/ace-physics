import { cx, Html, useUniqueId } from "@/helpers/frontend";
import { ChoicesConfigUnion, validateChoices } from "./choice-helpers";
import { ControlLabel } from "./labels";
import styles from "./toggle.module.scss";

export interface ToggleControlProps {
  label?: Html;
  layout?: "horizontal" | "vertical" | "grid";
  disabled?: boolean;
}

export const ToggleControl = <C,>({
  choices,
  value,
  onChange,
  label,
  layout = "horizontal",
  disabled = false,
}: {
  choices: ChoicesConfigUnion<C>;
  value: C | undefined;
  onChange: (reducer: (oldValue: C | undefined) => C | undefined) => void;
} & ToggleControlProps) => {
  validateChoices(choices);

  const toggleId = `toggle-${useUniqueId()}`;
  // Use an underscore to not overlap with `{${toggleId}-${choice}}`.
  const labelId = `${toggleId}_legend`;

  const needsWrapper = layout === "vertical" || layout === "grid";

  const choicesEl = (
    <div
      className={cx(
        layout === "horizontal" && styles.horizontal,
        layout === "vertical" && styles.vertical,
        layout === "grid" && styles.grid
      )}
      role="group"
      aria-labelledby={label ? labelId : undefined}
    >
      {choices.map(([choiceId, choiceLabel]) => (
        <label
          key={choiceId + ""}
          htmlFor={`${toggleId}-${choiceId}`}
          className={cx(
            styles.choice,
            value === choiceId && styles.selected,
            disabled && styles.disabled
          )}
        >
          <input
            type="radio"
            disabled={disabled}
            className={styles.radio}
            value={choiceId + ""}
            name={toggleId}
            id={`${toggleId}-${choiceId}`}
            checked={value === choiceId}
            onChange={(e) =>
              onChange((oldValue) => {
                if (e.target.checked) {
                  return choiceId;
                } else if (oldValue === choiceId) {
                  return undefined;
                } else {
                  return oldValue;
                }
              })
            }
          />
          {choiceLabel}
        </label>
      ))}
    </div>
  );

  return (
    <>
      {label && (
        <ControlLabel as="div" id={labelId}>
          {label}
        </ControlLabel>
      )}

      {needsWrapper ? <div>{choicesEl}</div> : choicesEl}
    </>
  );
};
