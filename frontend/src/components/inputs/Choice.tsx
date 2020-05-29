import React, { useRef, useState } from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";

let choiceId = 1;

export default function Choice<
  C extends readonly s.Literal[],
  M extends boolean
>({
  field,
  choices,
  allowOther = true,
}: {
  field: Field<s.ChoiceSchema<C, M, string>>;
  choices: ReadonlyArray<{ value: C[number]; label: React.ReactNode }>;
  allowOther?: boolean;
}) {
  const isMulti = field.schema.isMulti;

  // We need a unique ID that's self-contained to the lifetime of this component
  // but otherwise doesn't matter, so this solution is fine.
  const idRef = useRef<number>();
  const id = idRef.current || (idRef.current = ++choiceId);

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
    <div>
      {choices.map((choice) => (
        <label key={choice.value} htmlFor={`choice-${id}-${choice.value}`}>
          <input
            type={isMulti ? "checkbox" : "radio"}
            value={choice.value}
            id={`choice-${id}-${choice.value}`}
            checked={isSelected(choice)}
            onChange={(e) => select(choice, e.target.checked)}
          />
          {choice.label}
        </label>
      ))}

      {allowOther && (
        <label htmlFor={`choice-${id}-other`}>
          <input
            type={isMulti ? "checkbox" : "radio"}
            value="other"
            id={`choice-${id}-other`}
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
          />
          Other:
        </label>
      )}
      {allowOther && (
        <input
          type="text"
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
          }}
          onBlur={(e) => {
            // Blurring will clear the other selection if the input is empty.
            if (!e.target.value.trim()) {
              selectAndUpdateOther(undefined);
            }
          }}
        />
      )}
    </div>
  );
}
