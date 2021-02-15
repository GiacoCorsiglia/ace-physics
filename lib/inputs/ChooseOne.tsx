import { Html } from "@/helpers/frontend";
import { Model, useModel } from "@/reactivity";
import { Choice, Choices, ChooseOneField } from "@/schema/fields";
import React, { useState } from "react";
import { ChoicesConfig, validateChoices } from "./choices";
import ChoiceAnswer from "./ChooseAnswer";
import ChooseCore from "./ChooseCore";
import { useDisabled } from "./DisableInputs";

export default function ChooseOne<Cs extends Choices>({
  model,
  choices,
  allowOther = true,
  disabled = false,
  label,
  answer,
  explanation,
}: {
  model: Model<ChooseOneField<Cs>>;
  choices: ChoicesConfig<Cs>;
  allowOther?: boolean;
  label?: Html;
  disabled?: boolean;
  answer?: Choice<Cs>;
  explanation?: Html;
}) {
  validateChoices(choices);

  const [value, setValue] = useModel(model);
  const [otherInput, setOtherInput] = useState(value?.other || "");
  // eslint-disable-next-line no-param-reassign
  disabled = useDisabled(disabled);

  return (
    <>
      <ChooseCore
        isMulti={false}
        choices={choices}
        selected={value?.selected}
        onSelect={(selected) =>
          setValue((oldValue) => ({
            selected,
            other: allowOther ? oldValue?.other : undefined,
          }))
        }
        onDeselect={(deselected) =>
          setValue((oldValue) =>
            oldValue?.other === deselected
              ? {
                  selected: undefined,
                  other: allowOther ? oldValue?.other : undefined,
                }
              : oldValue
          )
        }
        other={{
          isSelected:
            value?.selected === undefined && value?.other !== undefined,
          inputValue: otherInput,
          setInputValue: setOtherInput,
          update: (inputValue) =>
            setValue((oldValue) => ({
              selected:
                // Don't clear selected if the input is empty or other is
                // deselected.
                inputValue !== undefined ? undefined : oldValue?.selected,
              other: inputValue,
            })),
        }}
        allowOther={allowOther}
        label={label}
        disabled={disabled}
      />

      <ChoiceAnswer
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
