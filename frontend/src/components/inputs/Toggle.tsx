import React, { useMemo, useState } from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";
import { classes, useUniqueId } from "src/util";
import inputStyles from "./inputs.module.scss";
import styles from "./Toggle.module.scss";

export default function Toggle<
  S extends s.BooleanSchema | s.ChoiceSchema<any, false, any>
>({
  field,
  choices: originalChoices,
  yes = "Yes",
  no = "No",
  label,
}: {
  field: Field<S>;
  label?: React.ReactNode;
} & (S extends s.ChoiceSchema<infer C, false, any>
  ? {
      choices: readonly {
        value: C[number];
        label: React.ReactNode;
      }[];
      yes?: never;
      no?: never;
    }
  : {
      choices?: never;
      yes?: React.ReactNode;
      no?: React.ReactNode;
    })) {
  const id = `toggle-${useUniqueId()}`;
  const [focusedChoice, setFocusedChoice] = useState<{}>();

  type Value = S extends s.ChoiceSchema<infer C, false, any>
    ? C[number]
    : boolean;

  const choices: readonly {
    value: Value;
    label: React.ReactNode;
  }[] = useMemo(
    () =>
      s.isChoiceSchema(field.schema)
        ? originalChoices
        : [
            // I think True/False or Yes/No is better than the reversed order.
            { value: true, label: yes },
            { value: false, label: no },
          ],
    [field, originalChoices, yes, no]
  ) as any;

  function select(value: Value, checked: boolean) {
    const fv: any = field.value;

    if (s.isChoiceSchema(field.schema)) {
      if (checked) {
        field.set({
          selected: value as any,
          other: fv?.other,
        });
      } else if (fv?.selected === value) {
        field.set({
          selected: undefined,
          other: fv?.other,
        });
      }
    } else {
      if (checked) {
        field.set(value as boolean);
      } else if (fv === value) {
        field.clear();
      }
    }
  }

  function isSelected(value: Value) {
    const fv: any = field.value;
    return fv !== undefined && (fv === value || fv.selected === value);
  }

  return (
    <>
      {label && (
        <div className={inputStyles.label} id={`${id}_legend`}>
          {label}
        </div>
      )}

      <div
        className={styles.choices}
        role="group"
        aria-labelledby={label ? `${id}_legend` : undefined}
      >
        {choices.map((choice) => (
          <label
            htmlFor={`${id}-${choice.value}`}
            className={classes(
              styles.choice,
              [styles.selected, isSelected(choice.value)],
              [styles.focused, choice === focusedChoice]
            )}
            key={choice.value.toString()}
          >
            <input
              type="radio"
              className={styles.radio}
              value={choice.value.toString()}
              name={id}
              id={`${id}-${choice.value}`}
              checked={isSelected(choice.value)}
              onChange={(e) => select(choice.value, e.target.checked)}
              onFocus={() => setFocusedChoice(choice)}
              onBlur={() =>
                setFocusedChoice((focused) =>
                  focused === choice ? undefined : focused
                )
              }
            />
            {choice.label}
          </label>
        ))}
      </div>
    </>
  );
}
