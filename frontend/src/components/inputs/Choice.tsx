import React, { useRef, useState } from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";
import { classes, useUniqueId } from "src/util";
import styles from "./inputs.module.scss";

export default function Choice<
  C extends readonly s.Literal[],
  M extends boolean
>({
  field,
  choices,
  allowOther = true,
  label,
}: {
  field: Field<s.ChoiceSchema<C, M, string>>;
  choices: ReadonlyArray<{ value: C[number]; label: React.ReactNode }>;
  allowOther?: boolean;
  label?: React.ReactNode;
}) {
  const isMulti = field.schema.isMulti;

  const id = `choice-${useUniqueId()}`;

  const [focusedChoice, setFocusedChoice] = useState<{}>();

  const [otherInput, setOtherInput] = useState(field.value?.other || "");
  const otherInputRef = useRef<HTMLInputElement>(null);

  function isSelected(choice: { value: C[number] }) {
    if (isMulti) {
      const selected = field.value?.selected as C[number][] | undefined;
      return selected !== undefined && selected.includes(choice.value);
    } else {
      return field.value?.selected === choice.value;
    }
  }
  const isOtherSelected = isMulti
    ? field.value?.other !== undefined
    : field.value?.selected === undefined && field.value?.other !== undefined;

  function select(choice: { value: C[number] }, checked: boolean) {
    const other = allowOther ? field.value?.other : undefined;

    if (isMulti) {
      const selected = field.value?.selected as C[number][] | undefined;
      if (checked) {
        field.set({
          selected: [...(selected || []), choice.value] as any,
          other,
        });
      } else if (selected !== undefined) {
        // It was unchecked, so remove it.
        field.set({
          selected: selected.filter((v) => v !== choice.value) as any,
          other,
        });
      }
      // If selected was undefined and something was unchecked then who cares.
    } else {
      // Single select case
      if (checked) {
        field.set({
          selected: choice.value as any,
          other,
        });
      } else if (field.value?.selected === choice.value) {
        // We probably shouldn't get here...
        field.set({
          selected: undefined,
          other,
        });
      }
    }
  }

  function selectAndUpdateOther(value: string | undefined) {
    if (isMulti) {
      field.set({
        selected: field.value?.selected,
        other: value,
      });
    } else if (value !== undefined) {
      field.set({
        selected: undefined, // Clear selected.
        other: value,
      });
    } else {
      field.set({
        selected: field.value?.selected, // Don't clear selected yet.
        other: undefined,
      });
    }
  }

  return (
    <>
      {label && (
        <div className={styles.label} id={`${id}_legend`}>
          {label}
        </div>
      )}

      <div
        className={classes([styles.noLabel, !label])}
        role="group"
        aria-labelledby={label ? `${id}_legend` : undefined}
      >
        {choices.map((choice) => (
          <label
            className={classes(
              styles.choiceChoice,
              [styles.selected, isSelected(choice)],
              [styles.focused, focusedChoice === choice]
            )}
            key={choice.value.toString()}
            htmlFor={`${id}-${choice.value}`}
          >
            <div className={styles.choiceRadioBox}>
              <input
                className={styles.choiceRadio}
                type={isMulti ? "checkbox" : "radio"}
                value={choice.value.toString()}
                name={id}
                id={`${id}-${choice.value}`}
                checked={isSelected(choice)}
                onChange={(e) => select(choice, e.target.checked)}
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
            className={classes(
              styles.choiceChoice,
              [styles.selected, isOtherSelected],
              [styles.focused, focusedChoice === "other"]
            )}
          >
            <label className={styles.choiceOtherLabel} htmlFor={`${id}-other`}>
              <div className={styles.choiceRadioBox}>
                <input
                  className={styles.choiceRadio}
                  type={isMulti ? "checkbox" : "radio"}
                  value="other"
                  name={id}
                  id={`${id}-other`}
                  checked={isOtherSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // The ref won't be null!
                      const input = otherInputRef.current as HTMLInputElement;
                      selectAndUpdateOther(input.value);
                      input.focus();
                    } else {
                      field.set({
                        selected: field.value?.selected,
                        other: undefined,
                      });
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
              placeholder="Click to input another answer"
              ref={otherInputRef}
              value={field.value?.other || otherInput}
              onChange={(e) => {
                const value = e.target.value;
                setOtherInput(value);
                selectAndUpdateOther(value || undefined);
              }}
              onFocus={(e) => {
                // Focusing will reselect other (if the field is not empty), but it
                // will never deselect.
                if (e.target.value) {
                  selectAndUpdateOther(e.target.value);
                }
                setFocusedChoice("other");
              }}
              onBlur={(e) => {
                // Blurring will clear the other selection if the input is empty.
                if (!e.target.value.trim()) {
                  selectAndUpdateOther(undefined);
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
