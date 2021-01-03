import { Answer, Prose } from "@/design";
import { Html } from "@/helpers/frontend";
import { arraysEqual } from "@/util";
import React from "react";

export default function ChoiceAnswer<C, M extends boolean>({
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
  choices: readonly {
    readonly value: C;
    readonly label: Html;
  }[];
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
