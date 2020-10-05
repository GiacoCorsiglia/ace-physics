import React from "react";
import * as s from "src/common/schema";
import { Answer, Prose } from "src/components";
import { Field } from "src/state";
import { arraysEqual } from "src/util";

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
        {isMulti ? (
          <ul>
            {(answer as C[number][]).map((a) => (
              <li key={a + ""}>
                {choices.find(({ value }) => value === a)!.label}
              </li>
            ))}
          </ul>
        ) : (
          <p>{choices.find(({ value }) => value === answer)!.label}</p>
        )}
        {typeof explanation === "string" ? <p>{explanation}</p> : explanation}
      </Prose>
    </Answer>
  );
}
