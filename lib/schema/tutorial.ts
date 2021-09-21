import * as f from "./fields";
import type { Infer } from "./types";

export type TutorialSchema<
  Pages extends readonly string[] = string[],
  Pretest extends f.Properties = f.Properties,
  Responses extends f.Properties = f.Properties,
  Message extends string = string,
  Sections extends {
    [name: string]: Section<readonly Message[]>;
  } = { [name: string]: Section<readonly Message[]> },
  Hints extends readonly string[] = string[]
> = f.ObjectField<{
  pages: f.ObjectField<PropertiesFromNames<Pages, typeof PageStatus>>;
  pretest: f.ObjectField<Pretest>;
  responses: f.ObjectField<Responses>;
  sections: f.ObjectField<Sections>;
  hints: f.ObjectField<PropertiesFromNames<Hints, typeof HintStatus>>;
  feedback: typeof TutorialFeedback;
}>;

export type TutorialState<S extends TutorialSchema = TutorialSchema> = Infer<
  S["type"]
>;

/**
 * Creates the schema for a new tutorial.
 */
export const tutorialSchema = <
  Page extends string,
  Pages extends readonly Page[],
  Pretest extends f.Properties,
  Responses extends f.Properties,
  Message extends string,
  Sections extends {
    [name: string]: Section<readonly Message[]>;
  },
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
}): TutorialSchema<Pages, Pretest, Responses, Message, Sections, Hints> => {
  return f.object({
    pages: statuses(pages, PageStatus),
    pretest: f.object(pretest),
    responses: f.object(responses),
    sections: f.object(sections),
    hints: statuses(hints, HintStatus),
    feedback: TutorialFeedback,
  });
};

const PageStatus = f.object({
  status: f.cases(
    "revealed",
    "answersPrompted",
    "answersRevealed",
    "completed"
  ),
  answers: f.object({
    reflection: f.string(),
  }),
});

type Section<Messages extends readonly string[] = string[]> = f.ObjectField<
  typeof baseSection.properties & {
    revealedMessages: f.ArrayField<f.CasesField<Messages>>;
  }
>;

const baseSection = f.object({
  status: f.cases("hidden", "revealed", "committed"),
  // Storing this allows us to sort revealed sections in the order they where
  // revealed, if relevant.
  revealedAt: f.number(),
});

export const section: {
  (): Section<[]>;
  <
    Message extends string,
    Messages extends readonly [Message, ...Message[]]
  >(c: {
    messages: Messages;
  }): Section<Messages>;
} = (c?: { messages?: [string, ...string[]] }) =>
  c && c.messages
    ? f.object({
        ...baseSection.properties,
        revealedMessages: f.array(f.cases(...c.messages)),
      })
    : (baseSection as any);

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

export const TutorialFeedback = f.object({
  workedAlone: f.chooseOne(["alone", "partner", "in class"]),
  confidence: f.chooseOne(["much less", "less", "same", "more", "much more"]),
  confidenceExplain: f.string(),
  easyOrChallenging: f.chooseOne([
    "easy/useful",
    "easy/frustrating",
    "challenging/useful",
    "challenging/frustrating",
  ]),
  easyOrChallengingExplain: f.string(),
  usedCourseMaterials: f.chooseOne(["no", "a bit", "repeatedly"]),
  usedOtherMaterials: f.chooseOne(["no", "a bit", "repeatedly"]),
  usedMaterialsOther: f.string(),
  technicalDifficulties: f.string(),
  genericFeedback: f.string(),

  // Feedback on feedback.
  answerCheckingChangeApproach: f.string(),
  answerCheckingPreferenceOpenEnded: f.string(),
});
