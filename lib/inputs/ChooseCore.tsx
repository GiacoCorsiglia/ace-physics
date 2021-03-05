import { Html, useUniqueId } from "@/helpers/frontend";
import { cx } from "linaria";
import { useRef, useState } from "react";
import { ChoicesConfigUnion } from "./choices";
import styles from "./inputs.module.scss";

const Other = Symbol("OtherChoice");

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
  choices: ChoicesConfigUnion<C>;
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
  const uniqueId = `choice-${useUniqueId()}`;
  const [focusedChoice, setFocusedChoice] = useState<C | typeof Other>();
  const otherInputRef = useRef<HTMLInputElement>(null);

  const isSelected = (choiceId: C) => {
    if (isMulti) {
      return (
        selected !== undefined && (selected as readonly C[]).includes(choiceId)
      );
    } else {
      return selected === choiceId;
    }
  };

  return (
    <>
      {label && (
        <div className={styles.label} id={`${uniqueId}_legend`}>
          {label}
        </div>
      )}

      <div
        className={cx(!label && styles.noLabel)}
        role="group"
        aria-labelledby={label ? `${uniqueId}_legend` : undefined}
      >
        {choices.map(([choiceId, choiceLabel]) => (
          <label
            className={cx(
              styles.choiceChoice,
              isSelected(choiceId) && styles.selected,
              disabled && styles.disabled,
              focusedChoice === choiceId && styles.focused
            )}
            key={choiceId + ""}
            htmlFor={`${uniqueId}-${choiceId}`}
          >
            <div className={styles.choiceRadioBox}>
              <input
                className={styles.choiceRadio}
                disabled={disabled}
                type={isMulti ? "checkbox" : "radio"}
                value={choiceId + ""}
                name={uniqueId + ""}
                id={`${uniqueId}-${choiceId}`}
                checked={isSelected(choiceId)}
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
            </div>

            <div className={styles.choiceLabel}>{choiceLabel}</div>
          </label>
        ))}

        {allowOther && (
          <div
            className={cx(
              styles.choiceChoice,
              other.isSelected && styles.selected,
              disabled && styles.disabled,
              focusedChoice === Other && styles.focused
            )}
          >
            <label
              className={styles.choiceOtherLabel}
              htmlFor={`${uniqueId}-other`}
            >
              <div className={styles.choiceRadioBox}>
                <input
                  className={styles.choiceRadio}
                  disabled={disabled}
                  type={isMulti ? "checkbox" : "radio"}
                  value="other"
                  name={uniqueId}
                  id={`${uniqueId}-other`}
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
                  onFocus={() => setFocusedChoice(Other)}
                  onBlur={() =>
                    setFocusedChoice((focused) =>
                      focused === Other ? undefined : focused
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
                setFocusedChoice(Other);
              }}
              onBlur={(e) => {
                // Blurring will clear the other selection if the input is empty.
                if (!e.target.value.trim()) {
                  other.update(undefined);
                }
                setFocusedChoice((focused) =>
                  focused === Other ? undefined : focused
                );
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
