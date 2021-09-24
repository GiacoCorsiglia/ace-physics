import type { Html } from "@/helpers/frontend";
import type { Model } from "@/reactivity";
import type { Infer } from "@/schema/fields";
import type { TutorialSchema, TutorialState } from "@/schema/tutorial";

////////////////////////////////////////////////////////////////////////////////
// Tutorials.
////////////////////////////////////////////////////////////////////////////////

/**
 * Configuration for a tutorial.
 */
export interface TutorialConfig<S extends TutorialSchema = TutorialSchema> {
  /**
   * Name of the tutorial
   */
  readonly name: string;
  /**
   * Edition of the tutorial.
   */
  readonly edition: string;
  /**
   * The schema for the tutorial.
   */
  readonly schema: S;
  /**
   * The link for the tutorial ("/tutorials/{this-part-of-the-link-only}")
   */
  readonly link: string;
  /**
   * The tutorial's title.
   */
  readonly label: Label;
  /**
   * Snippet of Html to show in the sidebar.
   */
  readonly info?: Html;
  /**
   * Whether the tutorial has a pretest page.
   */
  readonly pretest: boolean;
  /**
   * The list of pages in the tutorial to include in the sidebar.
   */
  readonly pages: readonly {
    /**
     * The page's link ("tutorials/tutorial-name/{this-part-of-the-link-only}").
     */
    readonly link: string;
    /**
     * The label for the page in the sidebar.
     */
    readonly label: Html;
  }[];
}

/**
 * Sets up a new tutorial.
 */
export const tutorial = <S extends TutorialSchema>(o: TutorialConfig<S>) => o;

////////////////////////////////////////////////////////////////////////////////
// Intro.
////////////////////////////////////////////////////////////////////////////////

/**
 * Configuration for the intro page.
 */
export interface IntroConfig<S extends TutorialSchema = TutorialSchema> {
  /**
   * The body of the introduction (displayed in addition to the default text).
   */
  readonly body: Html;
}

////////////////////////////////////////////////////////////////////////////////
// Pretests.
////////////////////////////////////////////////////////////////////////////////

/**
 * Configuration for the pretest page.
 */
export interface PretestConfig<S extends TutorialSchema = TutorialSchema> {
  /**
   * The sections in the pretest.
   */
  readonly sections: readonly PretestSectionConfig<S>[];
  /**
   * Settings for the "Submit and move on" button.
   */
  readonly continue?: {
    /**
     * List of optional fields.
     */
    readonly optional?: readonly StringKeys<
      S["properties"]["pretest"]["properties"]
    >[];
    /**
     * Conditional logic dictating when the continue button should be enabled.
     * By default, the button will only be enabled when all models used in the
     * pretest body are set.
     * @param state The current TutorialState.
     * @param allowed The original determination of whether the button should be
     * enabled based on the default logic.
     */
    readonly allowed?: (state: TutorialState<S>, allowed: boolean) => boolean;
  };
}

/**
 * Configuration for a section on the pretest page.
 */
export interface PretestSectionConfig<
  S extends TutorialSchema = TutorialSchema
> {
  /**
   * Controls the numbered/lettered label for the section.
   */
  readonly enumerate?: boolean;
  /**
   * The contents of this section.
   */
  readonly body:
    | Html
    | ((
        models: Models<S>["pretest"]["properties"],
        state: TutorialState<S>
      ) => Html);
}

////////////////////////////////////////////////////////////////////////////////
// Body Pages.
////////////////////////////////////////////////////////////////////////////////

/**
 * Configuration for a body page (aka a "part").
 */
export interface PageConfig<S extends TutorialSchema = TutorialSchema> {
  /**
   * The internal name for this page.
   */
  readonly name: StringKeys<S["properties"]["pages"]["properties"]>;
  /**
   * The page's title.
   */
  readonly label: Label;
  /**
   * Whether any answers on the page where checked.  We assume none were checked
   * by default.
   */
  readonly answers?: "none" | "checked-some" | "checked-all" | "provided";
  /**
   * The sections (or nested sequences of sections) in the page.
   */
  readonly sections: readonly NodeConfig<S>[];
}

////////////////////////////////////////////////////////////////////////////////
// Section Tree.
////////////////////////////////////////////////////////////////////////////////

/**
 * Configuration for a node in the section tree of a body page.
 */
export type NodeConfig<S extends TutorialSchema = TutorialSchema> =
  | SectionConfig<S>
  | SequenceConfig<S>
  | OneOfConfig<S>;

type LogicFunction<S extends TutorialSchema, R> = (
  responses: NonNullable<TutorialState<S>["responses"]>,
  state: TutorialState<S>
) => R;

type When<S extends TutorialSchema> = LogicFunction<S, boolean>;

/**
 * Configuration for a section of a body page.
 */
export interface SectionConfig<
  S extends TutorialSchema = TutorialSchema,
  Name extends keyof S["properties"]["sections"]["properties"] = string
> {
  readonly kind: "section";
  /**
   * The internal name of the section.
   */
  readonly name: Name;
  /**
   * The contents of the section.
   * @param models The list of models for the tutorial response fields.
   * @param state The current TutorialState.
   */
  readonly body?:
    | Html
    | ((
        models: Models<S>["responses"]["properties"],
        state: TutorialState<S>
      ) => Html);
  /**
   * Conditional logic dictating when the section should be revealed.
   */
  readonly when?: When<S>;
  /**
   * Controls the numbered/lettered label for the section.
   */
  readonly enumerate?: boolean;
  /**
   * Configuration for the hints included in this section.
   */
  readonly hints?: readonly (HintConfig<S> | readonly HintConfig<S>[])[];
  /**
   * Configuration for the section's continue button.
   */
  readonly continue?: {
    /**
     * The continue button's label.
     */
    readonly label?: Html | ((state: TutorialState<S>) => Html);
    /**
     * Conditional logic dictating when the continue button should be enabled.
     * By default, the button will only be enabled when all models used in the
     * section's body are set.
     * @param state The current TutorialState.
     * @param allowed The original determination of whether the button should be
     * enabled based on the default logic.
     */
    readonly allowed?: (state: TutorialState<S>, allowed: boolean) => boolean;
    /**
     * Conditional logic dictating when the continue button should be visible.
     * By default, it is always visible (even if it is disabled).
     * @param state The current TutorialState.
     */
    readonly visible?: (state: TutorialState<S>) => boolean;
  };
  /**
   * Configuration for guidance messages included in this section.
   */
  readonly guidance?: {
    /**
     * Determines which message should be revealed next.
     */
    readonly nextMessage: (
      responses: NonNullable<TutorialState<S>["responses"]>,
      state: TutorialState<S>
    ) => Infer<
      S["properties"]["sections"]["properties"][Name]["properties"]["revealedMessages"]["elements"]
    > | null;
    /**
     * The set of messages.
     */
    readonly messages: {
      [K in Infer<
        S["properties"]["sections"]["properties"][Name]["properties"]["revealedMessages"]["elements"]
      >]: {
        /**
         * The contents of the message.
         * @param state The current TutorialState.
         */
        readonly body: Html | ((state: TutorialState<S>) => Html);
        /**
         * Configures what to do when continuing from this message.  Return
         * "nextMessage" to rerun the `nextMessage` function and show another
         * message.  Return "nextSection" to not show any more messages and
         * instead move on to the next section.
         */
        readonly onContinue: "nextMessage" | "nextSection";
        /**
         * The label of the continue button.
         * @param state The current TutorialState.
         */
        readonly continueLabel?: Html | ((state: TutorialState<S>) => Html);
      };
    };
  };
}

/**
 * Configuration for a sequence of sections in the section tree of a body page.
 */
export interface SequenceConfig<S extends TutorialSchema = TutorialSchema> {
  readonly kind: "sequence";
  /**
   * Conditional logic dictating when the sequence should be revealed.
   */
  readonly when?: When<S>;
  /**
   * The sections inside this sequence.
   */
  readonly sections: readonly NodeConfig<S>[];
}

/**
 * Configuration for a group of sections, of which only one will ever be
 * displayed.  Which is displayed is determined by the conditional logic in the
 * `which` function.
 */
export interface OneOfConfig<
  S extends TutorialSchema = TutorialSchema,
  C extends { readonly [k: string]: NodeConfig<S> } = {
    readonly [k: string]: NodeConfig<S>;
  }
> {
  readonly kind: "oneOf";
  /**
   * Conditional logic dictating when the oneOf should be revealed.
   */
  readonly when?: When<S>;
  /**
   * Logic Determining which of the nested sections should be revealed.  Return
   * `null` to skip this group of sections entirely.
   */
  readonly which: (
    responses: NonNullable<TutorialState<S>["responses"]>,
    state: TutorialState<S>
  ) => keyof C | null;
  /**
   * The sections inside this sequence.  The keys in this object should match
   * the strings returned by the `which` function.
   */
  readonly sections: C;
}

export const section = <
  S extends TutorialSchema,
  Name extends keyof S["properties"]["sections"]["properties"]
>(
  c: Omit<SectionConfig<S, Name>, "kind">
): SectionConfig<S, Name> => ({ kind: "section", ...c });

export const sequence = <S extends TutorialSchema>(
  c: Omit<SequenceConfig<S>, "kind">
): SequenceConfig<S> => ({ kind: "sequence", ...c });

export const oneOf = <
  S extends TutorialSchema,
  C extends { readonly [k: string]: NodeConfig<S> }
>(
  c: Omit<OneOfConfig<S, C>, "kind">
): OneOfConfig<S, C> => ({ kind: "oneOf", ...c });

////////////////////////////////////////////////////////////////////////////////
// Hints.
////////////////////////////////////////////////////////////////////////////////

/**
 * Configuration for a hint.
 */
export interface HintConfig<S extends TutorialSchema> {
  /**
   * The internal name of the hint.
   */
  readonly name: StringKeys<S["properties"]["hints"]["properties"]>;
  /**
   * The contents of the hint, which will only be revealed when the hint button
   * is clicked.
   */
  readonly body:
    | Html
    | ((
        models: Models<S>["responses"]["properties"],
        state: TutorialState<S>
      ) => Html)
    | "disable";
  /**
   * The hint button's label.
   */
  readonly label?: Html | ((state: TutorialState<S>) => Html);
  /**
   * Conditional logic dictating when the hint button should be revealed.
   */
  readonly when?: When<S>;
}

export const hint = <S extends TutorialSchema>(
  c: HintConfig<S>
): HintConfig<S> => c;

////////////////////////////////////////////////////////////////////////////////
// Helpers.
////////////////////////////////////////////////////////////////////////////////

type Label =
  | string
  | {
      /**
       * The version of the label for display within the page.
       */
      readonly html: Html;
      /**
       * The version of the label for display in the browser tab bar.
       */
      readonly title: string;
    };

type Models<S extends TutorialSchema> = Model<S>["properties"];

type StringsOnly<T> = T extends string ? T : never;
type StringKeys<T> = StringsOnly<keyof T>;
