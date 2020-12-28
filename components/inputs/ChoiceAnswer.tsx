import { Field } from "@/state";
import { arraysEqual } from "@/util";
import * as s from "common/schema";
import { Answer, Prose } from "components";

export default function ChoiceAnswer<
  C extends readonly s.Literal[],
  M extends boolean
>({
  field,
  choices,
  answer,
  explanation,
}: {
  field: Field<s.ChoiceSchema<C, M, string>>;
  choices: ReadonlyArray<{ value: C[number]; label: React.ReactNode }>;
  answer?: M extends true ? C[number][] : C[number];
  explanation?: React.ReactNode;
}) {
  if (!answer) {
    return null;
  }

  const isMulti = field.schema.isMulti;

  return (
    <Answer
      correct={
        field.value?.other !== undefined
          ? "undetermined"
          : isMulti
          ? arraysEqual(
              answer as C[number][],
              field.value?.selected as C[number][]
            )
          : field.value?.selected === answer
      }
    >
      <Prose>
        <blockquote>
          {isMulti ? (
            <ul>
              {(answer as C[number][]).map((a) => (
                <li key={a + ""}>
                  {/* This shouldn't be undefined but guard just in case */}
                  {choices.find(({ value }) => value === a)?.label}
                </li>
              ))}
            </ul>
          ) : (
            // This shouldn't be undefined but guard just in case
            <p>{choices.find(({ value }) => value === answer)?.label}</p>
          )}
        </blockquote>
        {typeof explanation === "string" ? <p>{explanation}</p> : explanation}
      </Prose>
    </Answer>
  );
}
