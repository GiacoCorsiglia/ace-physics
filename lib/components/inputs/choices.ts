import { Html } from "@/helpers/frontend";
import { Choice, Choices } from "@/schema/fields";

export type ChoicesConfig<Cs extends Choices> = readonly (readonly [
  id: Choice<Cs>,
  label: Html
])[];

export type ChoicesConfigUnion<C> = readonly (readonly [id: C, label: Html])[];

export const validateChoices = (
  choices: ChoicesConfig<Choices> | ChoicesConfigUnion<any>
) => {
  if (process.env.NODE_ENV === "development") {
    const seen = new Set();
    for (const [id] of choices) {
      if (seen.has(id)) {
        throw new Error(
          `Repeated choice: "${id}".\nThis is probably due to a misconfigured <Toggle />, <Select />, <ChooseOne />, or <ChooseAll /> input.`
        );
      }
      seen.add(id);
    }
  }
};
