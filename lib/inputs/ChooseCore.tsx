import { Html, useUniqueId } from "@/helpers/frontend";
import { cx } from "linaria";
import { useRef, useState } from "react";
import styles from "./inputs.module.scss";

export default function ChooseCore<C, M extends Boolean>({
  isMulti,
  choices,
  selected,
  onSelect,
  onDeselect,
  other,
  label,
  allowOther,
  disabled,
}: {
  isMulti: M;
  choices: readonly {
    readonly value: C;
    readonly label: Html;
  }[];
  selected: (M extends true ? readonly C[] : C) | undefined;
  onSelect: (value: C) => void;
  onDeselect: (value: C) => void;
  other: {
    isSelected: boolean;
    update: (inputValue: string | undefined) => void;
    inputValue: string;
    setInputValue: (o: string) => void;
  };
  label: Html;
  allowOther: boolean;
  disabled: boolean;
}) {
  const id = `choice-${useUniqueId()}`;
  const [focusedChoice, setFocusedChoice] = useState<{}>();
  const otherInputRef = useRef<HTMLInputElement>(null);

  const isSelected = (choice: { value: C }) => {
    if (isMulti) {
      return (
        selected !== undefined &&
        (selected as readonly C[]).includes(choice.value)
      );
    } else {
      return selected === choice.value;
    }
  };

  return (
    <>
      {label && (
        <div className={styles.label} id={`${id}_legend`}>
          {label}
        </div>
      )}

      <div
        className={cx(!label && styles.noLabel)}
        role="group"
        aria-labelledby={label ? `${id}_legend` : undefined}
      >
        {choices.map((choice) => (
          <label
            className={cx(
              styles.choiceChoice,
              isSelected(choice) && styles.selected,
              disabled && styles.disabled,
              focusedChoice === choice && styles.focused
            )}
            key={choice.value + ""}
            htmlFor={`${id}-${choice.value}`}
          >
            <div className={styles.choiceRadioBox}>
              <input
                className={styles.choiceRadio}
                disabled={disabled}
                type={isMulti ? "checkbox" : "radio"}
                value={choice.value + ""}
                name={id}
                id={`${id}-${choice.value}`}
                checked={isSelected(choice)}
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
            </div>

            <div className={styles.choiceLabel}>{choice.label}</div>
          </label>
        ))}

        {allowOther && (
          <div
            className={cx(
              styles.choiceChoice,
              other.isSelected && styles.selected,
              disabled && styles.disabled,
              focusedChoice === "other" && styles.focused
            )}
          >
            <label className={styles.choiceOtherLabel} htmlFor={`${id}-other`}>
              <div className={styles.choiceRadioBox}>
                <input
                  className={styles.choiceRadio}
                  disabled={disabled}
                  type={isMulti ? "checkbox" : "radio"}
                  value="other"
                  name={id}
                  id={`${id}-other`}
                  checked={other.isSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // The ref won't be null!
                      const input = otherInputRef.current as HTMLInputElement;
                      other.update(input.value);
                      input.focus();
                    } else {
                      other.update(undefined);
                    }
                  }}
                  onFocus={() => setFocusedChoice("other")}
                  onBlur={() =>
                    setFocusedChoice((focused) =>
                      focused === "other" ? undefined : focused
                    )
                  }
                />
              </div>

              <div className={styles.choiceOtherLabelText}>Other:</div>
            </label>

            <input
              type="text"
              className={styles.choiceOtherInput}
              disabled={disabled}
              placeholder="Click to input another answer"
              ref={otherInputRef}
              value={other.inputValue}
              onChange={(e) => {
                const value = e.target.value;
                other.setInputValue(value);
                other.update(value || undefined);
              }}
              onFocus={(e) => {
                // Focusing will reselect other (if the field is not empty), but it
                // will never deselect.
                if (e.target.value) {
                  other.update(e.target.value);
                }
                setFocusedChoice("other");
              }}
              onBlur={(e) => {
                // Blurring will clear the other selection if the input is empty.
                if (!e.target.value.trim()) {
                  other.update(undefined);
                }
                setFocusedChoice((focused) =>
                  focused === "other" ? undefined : focused
                );
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
