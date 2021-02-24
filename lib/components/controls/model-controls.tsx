import { Html } from "@/helpers/frontend";
import { Model, useModel } from "@/reactivity";
import type {
  BooleanField,
  Choice,
  Choices,
  ChooseAllField,
  ChooseOneField,
  NumberField,
  StringField,
} from "@/schema/fields";
import React, { useState } from "react";
import {
  default as ChoiceAnswer,
  default as ChooseAnswer,
} from "../inputs/ChooseAnswer";
import { ChoicesConfig } from "./choice-helpers";
import { ChooseInput, ChooseInputProps } from "./choose";
import { NumericInput, NumericInputProps } from "./numeric";
import {
  MultiLineTextInput,
  MultiLineTextInputProps,
  TextInput,
  TextInputProps,
} from "./text";
import { ToggleInput, ToggleInputProps } from "./toggle";

////////////////////////////////////////////////////////////////////////////////
// Text.
////////////////////////////////////////////////////////////////////////////////

export const TextBox = ({
  model,
  ...props
}: {
  model: Model<StringField>;
} & MultiLineTextInputProps) => {
  const [value, setValue] = useModel(model);
  return <MultiLineTextInput {...props} value={value} onChange={setValue} />;
};

export const TextLine = ({
  model,
  ...props
}: {
  model: Model<StringField>;
} & TextInputProps) => {
  const [value, setValue] = useModel(model);
  return <TextInput {...props} value={value} onChange={setValue} />;
};

////////////////////////////////////////////////////////////////////////////////
// Numeric.
////////////////////////////////////////////////////////////////////////////////

export const Integer = ({
  model,
  ...props
}: {
  model: Model<NumberField>;
} & NumericInputProps) => {
  const [value, setValue] = useModel(model);
  return (
    <NumericInput {...props} type="integer" value={value} onChange={setValue} />
  );
};

export const Decimal = ({
  model,
  ...props
}: {
  model: Model<NumberField>;
} & NumericInputProps) => {
  const [value, setValue] = useModel(model);
  return (
    <NumericInput {...props} type="decimal" value={value} onChange={setValue} />
  );
};

////////////////////////////////////////////////////////////////////////////////
// Choose.
////////////////////////////////////////////////////////////////////////////////

export const ChooseOne = <Cs extends Choices>({
  model,
  choices,
  answer,
  explanation,
  ...props
}: {
  model: Model<ChooseOneField<Cs>>;
  choices: ChoicesConfig<Cs>;
  answer?: Choice<Cs>;
  explanation?: Html;
} & ChooseInputProps) => {
  const [value, setValue] = useModel(model);
  const [otherInput, setOtherInput] = useState(value?.other || "");

  // TODO:
  const allowOther = false;

  return (
    <>
      <ChooseInput
        {...props}
        multi={false}
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
        other={
          allowOther && {
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
          }
        }
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
};

export const ChooseAll = <Cs extends Choices>({
  model,
  choices,
  answer,
  explanation,
  ...props
}: {
  model: Model<ChooseAllField<Cs>>;
  choices: ChoicesConfig<Cs>;
  answer?: Choice<Cs>[];
  explanation?: Html;
} & ChooseInputProps) => {
  const [value, setValue] = useModel(model);
  const [otherInput, setOtherInput] = useState(value?.other || "");

  // TODO:
  const allowOther = false;

  return (
    <>
      <ChooseInput
        {...props}
        multi={true}
        choices={choices}
        selected={value?.selected}
        onSelect={(selected) =>
          setValue((oldValue) => ({
            selected: [...(value?.selected || []), selected],
            other: allowOther ? oldValue?.other : undefined,
          }))
        }
        onDeselect={(deselected) =>
          setValue((oldValue) => ({
            selected: oldValue?.selected?.filter((v) => v !== deselected),
            other: allowOther ? oldValue?.other : undefined,
          }))
        }
        other={
          allowOther && {
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
          }
        }
      />

      <ChooseAnswer
        isMulti={true}
        selected={value?.selected}
        other={value?.other}
        choices={choices}
        answer={answer}
        explanation={explanation}
      />
    </>
  );
};

////////////////////////////////////////////////////////////////////////////////
// Toggle.
////////////////////////////////////////////////////////////////////////////////

export const Toggle = <Cs extends Choices>({
  model,
  choices,
  answer,
  explanation,
  ...props
}: {
  model: Model<ChooseOneField<Cs, any>>;
  choices: ChoicesConfig<Cs>;
  answer?: Choice<Cs>;
  explanation?: Html;
} & ToggleInputProps) => {
  const [value, setValue] = useModel(model);
  return (
    <>
      <ToggleInput
        {...props}
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
};

export const BooleanToggle = ({
  model,
  yes = "Yes",
  no = "No",
  ...props
}: {
  model: Model<BooleanField>;
  yes?: Html;
  no?: Html;
} & ToggleInputProps) => {
  const [value, setValue] = useModel(model);
  return (
    <ToggleInput
      {...props}
      selected={value}
      choices={[
        // I think True/False or Yes/No is better than the reversed order.
        [true, yes],
        [false, no],
      ]}
      onSelect={setValue}
      onDeselect={(newValue) =>
        setValue((oldValue) => (oldValue === newValue ? undefined : oldValue))
      }
    />
  );
};
