import { Answer, Prose } from "@/design";
import { arraysEqual } from "@/helpers/frontend";
import React from "react";
import { ChoicesConfigUnion } from "./choices";

export default function ChoiceAnswer<C extends string, M extends boolean>({
  isMulti,
  selected,
  other,
  choices,
  answer,
  explanation,
}: {
  isMulti: M;
  selected: (M extends true ? readonly C[] : C) | undefined;
  other: string | undefined;
  choices: ChoicesConfigUnion<C>;
  answer?: M extends true ? C[] : C;
  explanation?: React.ReactNode;
}) {
  if (!answer) {
    return null;
  }

  return (
    <Answer
      correct={
        other !== undefined
          ? "undetermined"
          : isMulti
          ? arraysEqual(answer as C[], selected as C[] | undefined)
          : selected === answer
      }
    >
      <Prose>
        <blockquote>
          {isMulti ? (
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
}
