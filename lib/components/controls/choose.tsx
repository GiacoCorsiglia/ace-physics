import { borderRadius, colors, spacing } from "@/design";
import { Html, useUniqueId } from "@/helpers/frontend";
import { styled } from "linaria/lib/react";
import { useRef } from "react";
import { ChoicesConfigUnion, validateChoices } from "./choice-helpers";
import { InputLabel } from "./labels";

const styles: any = {};

export interface ChooseInputProps {
  label?: Html;
  disabled?: boolean;
}

export const ChooseInput = <C, M extends Boolean>({
  multi,
  choices,
  selected,
  onSelect,
  onDeselect,
  other,
  label,
  disabled = false,
}: {
  multi: M;
  choices: ChoicesConfigUnion<C>;
  selected: (M extends true ? readonly C[] : C) | undefined;
  onSelect: (value: C) => void;
  onDeselect: (value: C) => void;
  other:
    | false
    | {
        isSelected: boolean;
        update: (inputValue: string | undefined) => void;
        inputValue: string;
        setInputValue: (o: string) => void;
      };
} & ChooseInputProps) => {
  validateChoices(choices);

  const chooseId = `choose-${useUniqueId()}`;
  const labelId = `${chooseId}_legend`;

  const otherInputRef = useRef<HTMLInputElement>(null);

  const isSelected = (choiceId: C) => {
    if (multi) {
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
        <InputLabel as="div" id={labelId}>
          {label}
        </InputLabel>
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
                className={styles.choiceRadio}
                disabled={disabled}
                type={multi ? "checkbox" : "radio"}
                value={`${chooseId}-${choiceId}`}
                name={`${chooseId}-${choiceId}`}
                id={`${chooseId}-${choiceId}`}
                checked={isSelected(choiceId)}
                onChange={(e) =>
                  e.target.checked ? onSelect(choiceId) : onDeselect(choiceId)
                }
              />
            </ChoiceRadioBox>

            <ChoiceLabel>{choiceLabel}</ChoiceLabel>
          </Choice>
        ))}

        {other && (
          <div
            data-selected={other.isSelected || undefined}
            data-disabled={disabled || undefined}
            className={styles.choiceChoice}
          >
            <label
              className={styles.choiceOtherLabel}
              htmlFor={`${chooseId}-other`}
            >
              <div className={styles.choiceRadioBox}>
                <input
                  className={styles.choiceRadio}
                  disabled={disabled}
                  type={multi ? "checkbox" : "radio"}
                  value="other"
                  name={chooseId}
                  id={`${chooseId}-other`}
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
              }}
              onBlur={(e) => {
                // Blurring will clear the other selection if the input is empty.
                if (!e.target.value.trim()) {
                  other.update(undefined);
                }
              }}
            />
          </div>
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
