import * as f from "./fields";
import type { Infer } from "./types";

// This export makes the individual tutorial schema files simpler.
export * from "./fields";

////////////////////////////////////////////////////////////////////////////////
// Tutorials.
////////////////////////////////////////////////////////////////////////////////

/**
 * The schema for a tutorial, which defines all the pages, sections, hints, and
 * fields for responses to the body and pretest, as well as the available
 * feedback questions.
 */
export type TutorialSchema<
  Pages extends Dict<PageSchema> = Dict<PageSchema>,
  Pretest extends f.Properties = f.Properties,
  Posttest extends f.Properties = f.Properties,
  Responses extends f.Properties = f.Properties,
  Message extends string = string,
  Sections extends Dict<SectionSchema<readonly Message[]>> = Dict<
    SectionSchema<readonly Message[]>
  >,
  Hints extends Dict<HintSchema> = Dict<HintSchema>,
> = f.ObjectField<{
  pages: f.ObjectField<Pages>;
  pretest: f.ObjectField<Pretest>;
  posttest: f.ObjectField<{
    status: f.CasesField<["revealed", "completed"]>;
    completedPages: f.ArrayField<f.StringField>;
    responses: f.ObjectField<Posttest>;
  }>;
  responses: f.ObjectField<Responses>;
  sections: f.ObjectField<Sections>;
  hints: f.ObjectField<Hints>;
  feedback: typeof TutorialFeedback;
}>;

/**
 * The state of a tutorial instance.  This is the saved state of all the input
 * responses, as well as which sections and hints are visible, etc.
 */
export type TutorialState<S extends TutorialSchema = TutorialSchema> = Infer<
  S["type"]
>;

interface Dict<S> {
  readonly [name: string]: S;
}

/**
 * Creates the schema for a new tutorial.
 */
export const tutorial = <
  Pages extends Dict<PageSchema>,
  Pretest extends f.Properties,
  Posttest extends f.Properties,
  Responses extends f.Properties,
  Message extends string,
  Sections extends Dict<SectionSchema<readonly Message[]>>,
  Hints extends Dict<HintSchema>,
>({
  pages,
  pretest,
  posttest,
  responses,
  sections,
  hints,
}: {
  pages: Pages;
  pretest: Pretest;
  posttest: Posttest;
  responses: Responses;
  sections: Sections;
  hints: Hints;
}): TutorialSchema<
  Pages,
  Pretest,
  Posttest,
  Responses,
  Message,
  Sections,
  Hints
> => {
  return f.object({
    pages: f.object(pages),
    pretest: f.object(pretest),
    posttest: f.object({
      status: f.cases("revealed", "completed"),
      completedPages: f.array(f.string()),
      responses: f.object(posttest),
    }),
    responses: f.object(responses),
    sections: f.object(sections),
    hints: f.object(hints),
    feedback: TutorialFeedback,
  });
};

////////////////////////////////////////////////////////////////////////////////
// Pages.
////////////////////////////////////////////////////////////////////////////////

type PageSchema = typeof pageStatus;

const pageStatus = f.object({
  status: f.cases(
    "revealed",
    "answersPrompted",
    "answersRevealed",
    "completed",
  ),
  answers: f.object({
    reflection: f.string(),
  }),
});

/**
 * Creates a schema for a tutorial page.
 */
export const page = (): PageSchema => pageStatus;

////////////////////////////////////////////////////////////////////////////////
// Sections.
////////////////////////////////////////////////////////////////////////////////

type SectionSchema<Messages extends readonly string[] = string[]> =
  f.ObjectField<
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

/**
 * Creates a schema for a tutorial body section.
 */
export const section: {
  (): SectionSchema<[]>;
  <
    Message extends string,
    Messages extends readonly [Message, ...Message[]],
  >(c: {
    messages: Messages;
  }): SectionSchema<Messages>;
} = (c?: { messages?: [string, ...string[]] }) =>
  c && c.messages
    ? f.object({
        ...baseSection.properties,
        revealedMessages: f.array(f.cases(...c.messages)),
      })
    : (baseSection as any);

////////////////////////////////////////////////////////////////////////////////
// Hints.
////////////////////////////////////////////////////////////////////////////////

type HintSchema = typeof hintStatus;

const hintStatus = f.object({
  status: f.cases("hidden", "revealed"),
});

/**
 * Creates a schema for a tutorial hint.
 */
export const hint = () => hintStatus;

////////////////////////////////////////////////////////////////////////////////
// Feedback.
////////////////////////////////////////////////////////////////////////////////

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
