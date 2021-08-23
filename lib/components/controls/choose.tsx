import {
  cx,
  Html,
  styled,
  useSyncedState,
  useUniqueId,
} from "@/helpers/frontend";
import { useRef } from "react";
import { autoProse } from "../typography";
import { ChoicesConfigUnion, validateChoices } from "./choice-helpers";
import styles from "./choose.module.scss";
import { useDisabled } from "./disabled";
import { ControlLabel } from "./labels";
import { NumericInputControl } from "./numeric";
import { TextBoxControl, TextInputControl } from "./text";

// NOTE: React doesn't seem to fire onChange for radio buttons when they switch
// from true->false.  The code below tries to handle that case anyway, but
// doesn't rely on it either.

export interface ChooseControlProps {
  label?: Html;
  disabled?: boolean;
}

type Value<C, M extends boolean> =
  | (M extends true ? readonly C[] : C)
  | undefined;

type ChangeHandler<C, M extends boolean> = (
  reducer: (oldValue: Value<C, M>) => Value<C, M>
) => void;

export const ChooseControl = <
  C,
  M extends boolean,
  O extends string | number | undefined = undefined
>({
  multi,
  choices,
  value,
  onChange,
  other,
  label,
  disabled = false,
}: {
  multi: M;
  choices: ChoicesConfigUnion<C>;
  value: Value<C, M>;
  onChange: ChangeHandler<C, M>;
  other?: {
    /**
     * "Other" is "selected" if and only if it is not undefined [and, for a
     * "choose one" field, the `value` is undefined].
     */
    value: O | undefined;
    /** Will pass `undefined` whenever "other" is deselected. */
    onChange: (otherValue: O | undefined) => void;
    inputType?: string extends O
      ? "text-line" | "text-box"
      : number extends O
      ? "integer" | "decimal"
      : never;
  };
} & ChooseControlProps) => {
  validateChoices(choices);

  disabled = useDisabled(disabled);

  const chooseId = `choose-${useUniqueId()}`;
  const labelId = `${chooseId}_legend`;

  // For a single-select ("choose one"), ignore the "other" choice if any of the
  // given choices is selected.  This could probably be handled in a stricter
  // fashion (i.e., "make impossible states impossible"), but I think this keeps
  // things simpler.
  const isOtherSelected: boolean =
    !!other && other.value !== undefined && (multi || value === undefined);

  const [otherInputValue, setOtherInputValue] = useSyncedState(
    other?.value,
    (prop) => prop,
    // Alway skip the sync if the passed value is undefined.
    (prop) => !other || other.value === undefined || !prop
  );

  const otherInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const isSelected = (choiceId: C) => {
    if (multi) {
      return value !== undefined && (value as readonly C[]).includes(choiceId);
    } else {
      return value === choiceId;
    }
  };

  const emitOtherChange = (isSelected: boolean, value: O | undefined) => {
    if (!other) {
      // Why are we here?.
      return;
    }

    if (isSelected && !multi) {
      // Deselect all the non-other choices when other is selected (if this
      // isn't a multi-select).
      onChange(() => undefined);
    }

    // Clear the external other value when de-selecting other.  The local value
    // is still preserved.
    other?.onChange(isSelected ? value : undefined);
  };

  const handleCheckedChange = (choiceId: C, isChecked: boolean) => {
    if (multi) {
      // Multi-selects are simpler because each checkbox is independent of all
      // the others.
      (onChange as ChangeHandler<C, true>)((oldValue) => {
        const valueWithoutThisChoice = oldValue?.filter((v) => v !== choiceId);
        if (isChecked) {
          return [...(valueWithoutThisChoice || []), choiceId];
        } else {
          return valueWithoutThisChoice;
        }
      });
    } else {
      (onChange as ChangeHandler<C, false>)((oldValue) => {
        if (isChecked) {
          if (other) {
            emitOtherChange(false, otherInputValue);
          }

          return choiceId;
        } else if (oldValue === choiceId) {
          // Explicitly deselect if necessary
          return undefined;
        } else {
          return oldValue;
        }
      });
    }
  };

  return (
    <>
      {label && (
        <ControlLabel as="div" id={labelId}>
          {label}
        </ControlLabel>
      )}

      <div
        role="group"
        aria-labelledby={label ? labelId : undefined}
        className={cx(styles.container, disabled && styles.disabled)}
      >
        {choices.map(([choiceId, choiceLabel]) => (
          <Choice
            as="label"
            selected={isSelected(choiceId)}
            disabled={disabled}
            key={choiceId + ""}
            htmlFor={`${chooseId}-${choiceId}`}
          >
            <ChoiceRadioBox>
              <input
                type={multi ? "checkbox" : "radio"}
                disabled={disabled}
                value={`${chooseId}-${choiceId}`}
                name={`${chooseId}-${choiceId}`}
                id={`${chooseId}-${choiceId}`}
                checked={isSelected(choiceId)}
                onChange={(e) =>
                  handleCheckedChange(choiceId, e.target.checked)
                }
              />
            </ChoiceRadioBox>

            <ChoiceLabel>{autoProse(choiceLabel)}</ChoiceLabel>
          </Choice>
        ))}

        {other && (
          <Choice as="div" selected={isOtherSelected} disabled={disabled}>
            <label className={styles.otherLabeL} htmlFor={`${chooseId}-other`}>
              <ChoiceRadioBox>
                <input
                  disabled={disabled}
                  type={multi ? "checkbox" : "radio"}
                  value="other"
                  name={chooseId}
                  id={`${chooseId}-other`}
                  checked={isOtherSelected}
                  onChange={(e) => {
                    emitOtherChange(e.target.checked, otherInputValue);
                    if (e.target.checked) {
                      otherInputRef.current?.focus();
                    }
                  }}
                />
              </ChoiceRadioBox>

              <div className={styles.otherLabelText}>Other</div>
            </label>

            {(() => {
              const inputProps: JSX.IntrinsicElements["input"] = {
                disabled,
                "aria-label": "Input your other answer here",
                placeholder: "Click to input another answer",
                className: styles.otherInput,
                onFocus(e) {
                  // Focusing will reselect other (if the field is not empty), but it
                  // will never deselect.
                  if (e.target.value) {
                    emitOtherChange(true, otherInputValue);
                  }
                },
                onBlur(e) {
                  // Blurring will clear the other selection if the input is
                  // empty (including if it's just whitespace).
                  if (!e.target.value.trim()) {
                    emitOtherChange(false, undefined);
                  }
                },
              };

              const handleOtherInputChange = (
                newValue: string | number | undefined
              ) => {
                setOtherInputValue(newValue as O);
                if (typeof newValue === "string" && !newValue) {
                  newValue = undefined;
                }
                emitOtherChange(newValue !== undefined, newValue as O);
              };

              switch (other.inputType) {
                case "integer":
                case "decimal":
                  return (
                    <NumericInputControl
                      {...inputProps}
                      type={other.inputType as "integer" | "decimal"}
                      ref={otherInputRef as any}
                      value={otherInputValue as number}
                      onChange={handleOtherInputChange}
                    />
                  );
                case "text-box":
                  return (
                    <TextBoxControl
                      {...(inputProps as JSX.IntrinsicElements["textarea"])}
                      ref={otherInputRef as any}
                      value={otherInputValue as string}
                      onChange={handleOtherInputChange}
                    />
                  );
                case "text-line":
                case undefined:
                  return (
                    <TextInputControl
                      {...inputProps}
                      ref={otherInputRef as any}
                      value={otherInputValue as string}
                      onChange={handleOtherInputChange}
                    />
                  );
              }
            })()}
          </Choice>
        )}
      </div>
    </>
  );
};

const Choice = styled.label<{
  selected: boolean;
  disabled: boolean;
}>(({ selected, disabled }) => [
  styles.choice,
  selected && styles.selected,
  disabled && styles.disabled,
]);
const ChoiceRadioBox = styled.div(styles.choiceRadioBox);
const ChoiceLabel = styled.div(styles.choiceLabel);
