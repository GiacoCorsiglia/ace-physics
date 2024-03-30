import { cx, Html, useUniqueId } from "@/helpers/client";
import { autoProse } from "../typography";
import { ChoicesConfigUnion, validateChoices } from "./choice-helpers";
import { useDisabled } from "./disabled";
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

  disabled = useDisabled(disabled);

  const toggleId = `toggle-${useUniqueId()}`;
  // Use an underscore to not overlap with `{${toggleId}-${choice}}`.
  const labelId = `${toggleId}_legend`;

  return (
    <>
      {label && (
        <ControlLabel as="div" id={labelId}>
          {label}
        </ControlLabel>
      )}

      {/* The actual container is displayed inline-flex or -grid, so wrap with a block-level element. */}
      <div className={styles.root}>
        <div
          className={cx(
            styles.container,
            disabled && styles.disabled,
            layout === "horizontal" && styles.horizontal,
            layout === "vertical" && styles.vertical,
            layout === "grid" && styles.grid,
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
                disabled && styles.disabled,
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
              {autoProse(choiceLabel)}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};
