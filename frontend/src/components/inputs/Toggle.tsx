import React, { useMemo, useRef } from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";
import { classes } from "src/util";

let toggleId = 1;

export default function Toggle<
  S extends s.BooleanSchema | s.ChoiceSchema<any, false, any>
>({
  field,
  choices: originalChoices = undefined,
  yes = "Yes",
  no = "No",
}: {
  field: Field<S>;
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
  // We need a unique ID that's self-contained to the lifetime of this component
  // but otherwise doesn't matter, so this solution is fine.
  const idRef = useRef<number>();
  const id = idRef.current || (idRef.current = ++toggleId);

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
    <div>
      {choices.map((choice) => (
        <label
          htmlFor={`toggle-${id}-${choice.value}`}
          className={classes(["selected", isSelected(choice.value)])}
          key={choice.value.toString()}
        >
          <input
            type="radio"
            value={choice.value.toString()}
            id={`toggle-${id}-${choice.value}`}
            checked={isSelected(choice.value)}
            onChange={(e) => select(choice.value, e.target.checked)}
          />
          {choice.label}
        </label>
      ))}
    </div>
  );
}
