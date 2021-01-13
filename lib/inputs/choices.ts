import { Html } from "@/helpers/frontend";
import { Choice, Choices } from "@/schema/fields";

export type ChoicesConfig<Cs extends Choices> = readonly (readonly [
  id: Choice<Cs>,
  label: Html
])[];

export type ChoicesConfigUnion<C> = readonly (readonly [id: C, label: Html])[];
