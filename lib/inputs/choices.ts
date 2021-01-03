import { Html } from "@/helpers/frontend";
import { Model } from "@/reactivity";
import { Choice, Choices, ChooseOneField } from "@/schema/fields";

export type ChoicesConfig<Cs extends Choices> = readonly {
  readonly value: Choice<Cs>;
  readonly label: Html;
}[];

export const choices = <Cs extends Choices>(
  model: Model<ChooseOneField<Cs>> | Model<ChooseOneField<Cs>>,
  choices?: { [K in Choice<Cs>]: Html }
): ChoicesConfig<Cs> => {
  return choices
    ? Object.entries(choices).map(([value, label]) => ({
        value,
        label: label as Html, // This wasn't inferred
      }))
    : model.field.choices.map((value) => ({ value, label: value }));
};
