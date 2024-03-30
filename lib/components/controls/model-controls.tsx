import { Html } from "@/helpers/client";
import { Model, useModel } from "@/reactivity";
import type {
  BooleanField,
  Choice,
  Choices,
  ChooseAllField,
  ChooseOneField,
  NumberField,
  OtherChoiceField,
  StringField,
} from "@/schema/fields";
import { useEffect } from "react";
import { ChoiceAnswer, ChoicesConfig } from "./choice-helpers";
import { ChooseControl, ChooseControlProps } from "./choose";
import { DropdownControl, DropdownControlProps } from "./dropdown";
import { NumericInputControl, NumericInputControlProps } from "./numeric";
import {
  TextAreaControlProps,
  TextBoxControl,
  TextInputControl,
  TextInputControlProps,
} from "./text";
import { ToggleControl, ToggleControlProps } from "./toggle";

////////////////////////////////////////////////////////////////////////////////
// Text.
////////////////////////////////////////////////////////////////////////////////

export const TextBox = ({
  model,
  initialValue,
  ...props
}: {
  model: Model<StringField>;
  initialValue?: string;
} & TextAreaControlProps) => {
  const [value, setValue] = useModel(model);
  useInitialValue(initialValue, setValue);
  return <TextBoxControl {...props} value={value} onChange={setValue} />;
};

export const TextLine = ({
  model,
  initialValue,
  ...props
}: {
  model: Model<StringField>;
  initialValue?: string;
} & TextInputControlProps) => {
  const [value, setValue] = useModel(model);
  useInitialValue(initialValue, setValue);
  return <TextInputControl {...props} value={value} onChange={setValue} />;
};

////////////////////////////////////////////////////////////////////////////////
// Numeric.
////////////////////////////////////////////////////////////////////////////////

export const Integer = ({
  model,
  initialValue,
  ...props
}: {
  model: Model<NumberField>;
  initialValue?: number;
} & NumericInputControlProps) => {
  const [value, setValue] = useModel(model);
  useInitialValue(initialValue, setValue);
  return (
    <NumericInputControl
      {...props}
      type="integer"
      value={value}
      onChange={setValue}
    />
  );
};

export const Decimal = ({
  model,
  initialValue,
  ...props
}: {
  model: Model<NumberField>;
  initialValue?: number;
} & NumericInputControlProps) => {
  const [value, setValue] = useModel(model);
  useInitialValue(initialValue, setValue);
  return (
    <NumericInputControl
      {...props}
      type="decimal"
      value={value}
      onChange={setValue}
    />
  );
};

////////////////////////////////////////////////////////////////////////////////
// Choose.
////////////////////////////////////////////////////////////////////////////////

type ChooseValueWithOther =
  | undefined
  | {
      other?: string | number | undefined;
    };

export const ChooseOne = <
  Cs extends Choices,
  O extends OtherChoiceField | undefined,
>({
  model,
  initialValue,
  choices,
  answer,
  explanation,
  ...props
}: {
  model: Model<ChooseOneField<Cs, O>>;
  initialValue?: Choice<Cs>;
  choices: ChoicesConfig<Cs>;
  answer?: Choice<Cs>;
  explanation?: Html;
} & ChooseControlProps) => {
  const [value, setValue] = useModel(model);
  useInitialChoice(initialValue, setValue);
  return (
    <>
      <ChooseControl
        {...props}
        multi={false}
        choices={choices}
        value={value?.selected}
        onChange={(reducer) => {
          setValue((oldValue) => {
            const selected = reducer(oldValue?.selected);
            return model.other
              ? {
                  selected,
                  // This is a Choose One field, so we need to deselect "other"
                  // if one of the provided choices was chosen.
                  other:
                    selected !== undefined
                      ? undefined
                      : (oldValue as ChooseValueWithOther)?.other,
                }
              : { selected };
          });
        }}
        other={
          model.other && {
            value: (value as ChooseValueWithOther)?.other,
            onChange: (otherValue) =>
              setValue((oldValue) => ({
                // This is a Choose One field, so selecting "other" must
                // deselect on the provided choices, but otherwise we shouldn't
                // clear selected if "other" was deselected.
                selected:
                  otherValue !== undefined ? undefined : oldValue?.selected,
                other: otherValue,
              })),
          }
        }
      />

      <ChoiceAnswer
        multi={false}
        selected={value?.selected}
        other={(value as ChooseValueWithOther)?.other}
        choices={choices}
        answer={answer}
        explanation={explanation}
      />
    </>
  );
};

export const ChooseAll = <
  Cs extends Choices,
  O extends OtherChoiceField | undefined,
>({
  model,
  initialValue,
  choices,
  answer,
  explanation,
  ...props
}: {
  model: Model<ChooseAllField<Cs, O>>;
  initialValue?: readonly Choice<Cs>[];
  choices: ChoicesConfig<Cs>;
  answer?: readonly Choice<Cs>[];
  explanation?: Html;
} & ChooseControlProps) => {
  const [value, setValue] = useModel(model);
  useInitialChoice(initialValue, setValue);
  return (
    <>
      <ChooseControl
        {...props}
        multi={true}
        choices={choices}
        value={value?.selected}
        onChange={(reducer) => {
          setValue((oldValue) => {
            const selected = reducer(oldValue?.selected);
            return model.other
              ? {
                  selected,
                  // This is a Choose All field, so (de)selecting choices has no
                  // effect on "other".
                  other: (oldValue as ChooseValueWithOther)?.other,
                }
              : { selected };
          });
        }}
        other={
          model.other && {
            value: (value as ChooseValueWithOther)?.other,
            onChange: (otherValue) =>
              setValue((oldValue) => ({
                // This is a Choose All field, so (de)selecting "other" has no
                // effect on the provided choices.
                selected: oldValue?.selected,
                other: otherValue,
              })),
          }
        }
      />

      <ChoiceAnswer
        multi={true}
        selected={value?.selected}
        other={(value as ChooseValueWithOther)?.other}
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
  initialValue,
  choices,
  answer,
  explanation,
  ...props
}: {
  model: Model<ChooseOneField<Cs, undefined>>;
  initialValue?: Choice<Cs>;
  choices: ChoicesConfig<Cs>;
  answer?: Choice<Cs>;
  explanation?: Html;
} & ToggleControlProps) => {
  const [value, setValue] = useModel(model);
  useInitialChoice(initialValue, setValue);
  return (
    <>
      <ToggleControl
        {...props}
        value={value?.selected}
        choices={choices}
        onChange={(reducer) =>
          setValue((oldValue) => ({ selected: reducer(oldValue?.selected) }))
        }
      />

      <ChoiceAnswer
        multi={false}
        selected={value?.selected}
        other={undefined}
        choices={choices}
        answer={answer}
        explanation={explanation}
      />
    </>
  );
};

export const BooleanToggle = ({
  model,
  initialValue,
  yes = "Yes",
  no = "No",
  ...props
}: {
  model: Model<BooleanField>;
  initialValue?: boolean;
  yes?: Html;
  no?: Html;
} & ToggleControlProps) => {
  const [value, setValue] = useModel(model);
  useInitialValue(initialValue, setValue);
  return (
    <ToggleControl
      {...props}
      value={value}
      choices={[
        // I think True/False or Yes/No is better than the reversed order.
        [true, yes],
        [false, no],
      ]}
      onChange={setValue}
    />
  );
};

////////////////////////////////////////////////////////////////////////////////
// Dropdown.
////////////////////////////////////////////////////////////////////////////////

export const Dropdown = <Cs extends Choices>({
  model,
  initialValue,
  choices,
  answer,
  explanation,
  ...props
}: {
  model: Model<ChooseOneField<Cs, undefined>>;
  initialValue?: Choice<Cs>;
  choices: ChoicesConfig<Cs>;
  answer?: Choice<Cs>;
  explanation?: Html;
} & DropdownControlProps) => {
  const [value, setValue] = useModel(model);
  useInitialChoice(initialValue, setValue);
  return (
    <>
      <DropdownControl
        {...props}
        value={value?.selected}
        choices={choices}
        onChange={(newValue) => setValue({ selected: newValue })}
      />

      <ChoiceAnswer
        multi={false}
        selected={value?.selected}
        other={undefined}
        choices={choices}
        answer={answer}
        explanation={explanation}
      />
    </>
  );
};

////////////////////////////////////////////////////////////////////////////////
// Helpers.
////////////////////////////////////////////////////////////////////////////////

const useInitialValue = <T,>(
  initialValue: T,
  setValue: (setter: (prev: T) => T) => void,
) =>
  useEffect(() => {
    if (initialValue !== undefined) {
      setValue((prevValue) =>
        prevValue === undefined ? initialValue : prevValue,
      );
    }
  }, [initialValue, setValue]);

const useInitialChoice = <T,>(
  initialValue: T | undefined,
  setValue: (
    setter: (
      prev: { readonly selected?: T } | undefined,
    ) => { readonly selected?: T } | undefined,
  ) => void,
) =>
  useEffect(() => {
    if (initialValue !== undefined) {
      setValue((prevValue) =>
        prevValue === undefined ? { selected: initialValue } : prevValue,
      );
    }
  }, [initialValue, setValue]);
