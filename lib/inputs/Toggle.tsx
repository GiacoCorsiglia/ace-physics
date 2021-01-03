import { Html } from "@/helpers/frontend";
import { Model, useModel } from "@/reactivity";
import { Choice, Choices, ChooseOneField } from "@/schema/fields";
import React from "react";
import { ChoicesConfig } from "./choices";
import ChooseAnswer from "./ChooseAnswer";
import { useDisabled } from "./DisableInputs";
import ToggleCore, { ToggleCoreProps } from "./ToggleCore";

export default function Toggle<Cs extends Choices>({
  model,
  choices,
  disabled = false,
  answer,
  explanation,
  ...props
}: {
  model: Model<ChooseOneField<Cs, any>>;
  choices: ChoicesConfig<Cs>;
  disabled?: boolean;
  answer?: Choice<Cs>;
  explanation?: Html;
} & ToggleCoreProps) {
  const [value, setValue] = useModel(model);
  disabled = useDisabled(disabled);

  return (
    <>
      <ToggleCore
        selected={value?.selected}
        choices={choices}
        onSelect={(newValue) =>
          setValue({
            selected: newValue as any,
            other: value?.other,
          })
        }
        onDeselect={(newValue) =>
          setValue((oldValue) =>
            oldValue?.selected === newValue
              ? {
                  selected: undefined,
                  other: oldValue?.other,
                }
              : oldValue
          )
        }
        disabled={disabled}
        {...props}
      />

      <ChooseAnswer
        isMulti={false}
        selected={value?.selected}
        other={value?.other}
        choices={choices}
        answer={answer}
        explanation={explanation}
      />
    </>
  );
}
