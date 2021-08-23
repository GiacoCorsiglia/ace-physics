import { arraysEqual, Html } from "@/helpers/frontend";
import type { Choice, Choices } from "@/schema/fields";
import { Answer } from "../answers";
import { Prose } from "../typography";

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
          `Repeated choice: "${id}".\nThis is probably due to a misconfigured <Toggle />, <Select />, <ChooseOne />, or <ChooseAll /> control.`
        );
      }
      seen.add(id);
    }
  }
};

export const ChoiceAnswer = <C extends string, M extends boolean>({
  multi,
  selected,
  other,
  choices,
  answer,
  explanation,
}: {
  multi: M;
  selected: (M extends true ? readonly C[] : C) | undefined;
  other: string | number | undefined;
  choices: ChoicesConfigUnion<C>;
  answer?: M extends true ? readonly C[] : C;
  explanation?: React.ReactNode;
}) => {
  if (!answer) {
    return null;
  }

  return (
    <Answer
      correct={
        other !== undefined
          ? "undetermined"
          : multi
          ? arraysEqual(answer as C[], selected as C[] | undefined)
          : selected === answer
      }
    >
      <Prose>
        <blockquote>
          {multi ? (
            <ul>
              {(answer as C[]).map((a) => (
                <li key={a + ""}>
                  {/* This shouldn't be undefined but guard just in case */}
                  {choices.find(([choiceId]) => choiceId === a)?.[1]}
                </li>
              ))}
            </ul>
          ) : (
            // This shouldn't be undefined but guard just in case
            <p>{choices.find(([choiceId]) => choiceId === answer)?.[1]}</p>
          )}
        </blockquote>
        {typeof explanation === "string" ? <p>{explanation}</p> : explanation}
      </Prose>
    </Answer>
  );
};
