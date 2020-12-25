import * as f from "./fields";
import type { Infer } from "./types";

export type TutorialSchema<
  Pages extends readonly string[] = string[],
  Pretest extends f.Properties = f.Properties,
  Responses extends f.Properties = f.Properties,
  Sections extends readonly string[] = string[],
  Hints extends readonly string[] = string[]
> = f.ObjectField<{
  pages: f.ObjectField<PropertiesFromNames<Pages, typeof PageStatus>>;
  pretest: f.ObjectField<Pretest>;
  responses: f.ObjectField<Responses>;
  sections: f.ObjectField<PropertiesFromNames<Sections, typeof SectionStatus>>;
  hints: f.ObjectField<PropertiesFromNames<Hints, typeof HintStatus>>;
  feedback: typeof TutorialFeedback;
}>;

export type TutorialData = Infer<TutorialSchema["type"]>;

export const tutorialSchema = <
  Page extends string,
  Pages extends readonly Page[],
  Pretest extends f.Properties,
  Responses extends f.Properties,
  Section extends string,
  Sections extends readonly Section[],
  Hint extends string,
  Hints extends readonly Hint[]
>({
  pages,
  pretest,
  responses,
  sections,
  hints,
}: {
  pages: Pages;
  pretest: Pretest;
  responses: Responses;
  sections: Sections;
  hints: Hints;
}): TutorialSchema<Pages, Pretest, Responses, Sections, Hints> => {
  return f.object({
    pages: statuses(pages, PageStatus),
    pretest: f.object(pretest),
    responses: f.object(responses),
    sections: statuses(sections, SectionStatus),
    hints: statuses(hints, HintStatus),
    feedback: TutorialFeedback,
  });
};

const TutorialFeedback = f.object({
  // TODO
});

const PageStatus = f.object({
  answersRevealed: f.boolean(),
});

const SectionStatus = f.object({
  status: f.cases("hidden", "revealed", "committed"),
});

const HintStatus = f.object({
  status: f.cases("hidden", "revealed"),
});

type PropertiesFromNames<Names extends readonly string[], F extends f.Field> = {
  [K in Names[number]]: F;
};

const statuses = <Names extends readonly string[], F extends f.Field>(
  names: Names,
  field: F
) =>
  f.object(
    Object.fromEntries(
      names.map((name) => [name, field])
    ) as PropertiesFromNames<Names, F>
  );
