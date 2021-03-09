import { borderRadius, colors, spacing } from "@/design";
import { Html, useSyncedState, useUniqueId } from "@/helpers/frontend";
import { css } from "linaria";
import { styled } from "linaria/lib/react";
import { useRef } from "react";
import { ChoicesConfigUnion, validateChoices } from "./choice-helpers";
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

      <div role="group" aria-labelledby={label ? labelId : undefined}>
        {choices.map(([choiceId, choiceLabel]) => (
          <Choice
            as="label"
            data-selected={isSelected(choiceId) || undefined}
            data-disabled={disabled || undefined}
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

            <ChoiceLabel>{choiceLabel}</ChoiceLabel>
          </Choice>
        ))}

        {other && (
          <Choice
            as="div"
            data-selected={isOtherSelected || undefined}
            data-disabled={disabled || undefined}
          >
            <label
              className={css`
                display: flex;
                align-items: center;
                align-self: stretch;
              `}
              htmlFor={`${chooseId}-other`}
            >
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

              <div
                className={css`
                  padding-top: ${spacing.$50};
                  padding-bottom: ${spacing.$50};
                  padding-left: ${spacing.$75};
                  padding-right: ${spacing.$25};

                  &::after {
                    content: ":";
                  }
                `}
              >
                Other
              </div>
            </label>

            {(() => {
              const inputProps: JSX.IntrinsicElements["input"] = {
                disabled,
                "aria-label": "Input your other answer here",
                placeholder: "Click to input another answer",
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

const ChoiceRadioBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${spacing.$100};
  border-right: 1px solid ${colors.neutral.$300};
  align-self: stretch;
  background-color: ${colors.neutral.$50};
  transition: border-color 75ms ease-in-out, background-color 75ms ease-in-out;
`;

const ChoiceLabel = styled.div`
  padding: ${spacing.$50} ${spacing.$75};
  color: ${colors.neutral.$800};
`;

const Choice = styled.label`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.neutral.$400};
  background-color: ${colors.neutral.$50};

  transition: border-color 75ms ease-in-out;

  & + & {
    margin-top: -1px;
  }

  &:first-child {
    border-top-left-radius: ${borderRadius};
    border-top-right-radius: ${borderRadius};

    ${ChoiceRadioBox} {
      border-top-left-radius: ${borderRadius};
    }
  }

  &:last-child {
    border-bottom-left-radius: ${borderRadius};
    border-bottom-right-radius: ${borderRadius};

    ${ChoiceRadioBox} {
      border-bottom-left-radius: ${borderRadius};
    }
  }

  &:focus-within,
  &:not([data-disabled]):hover,
  &[data-selected] {
    position: relative;
    z-index: 2;
    border-color: ${colors.neutral.$500};

    ${ChoiceRadioBox} {
      background-color: ${colors.blue.$200};
      border-color: ${colors.neutral.$500};
    }
  }

  &:not([data-selected]):not(:focus-within)[data-disabled] {
    border-color: ${colors.neutral.$300};

    ${ChoiceLabel} {
      color: ${colors.neutral.$700};
    }

    ${ChoiceRadioBox} {
      background-color: ${colors.neutral.$200};
      border-color: ${colors.neutral.$300};
    }
  }
`;
