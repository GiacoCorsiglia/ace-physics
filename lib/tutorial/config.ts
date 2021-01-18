import type { Html } from "@/helpers/frontend";
import type { Model } from "@/reactivity";
import type { TutorialSchema, TutorialState } from "@/schema/tutorial";

type Models<S extends TutorialSchema> = Model<S>["properties"];

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

/**
 * Configuration for the intro page.
 */
export interface IntroConfig<S extends TutorialSchema = TutorialSchema> {
  /**
   * The body of the introduction (displayed in addition to the default text).
   */
  readonly body: Html;
}

/**
 * Configuration for the pretest page.
 */
export interface PretestConfig<S extends TutorialSchema = TutorialSchema> {
  /**
   * The sections in the pretest.
   */
  readonly sections: readonly PretestSectionConfig<S>[];
}

/**
 * Configuration for a section on the pretest page.
 */
export interface PretestSectionConfig<
  S extends TutorialSchema = TutorialSchema
> {
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

/**
 * Configuration for a body page (aka a "part").
 */
export interface PageConfig<S extends TutorialSchema = TutorialSchema> {
  /**
   * The internal name for this page.
   */
  readonly name: keyof S["properties"]["pages"]["properties"];
  /**
   * The page's title.
   */
  readonly label: Label;
  /**
   * The sections (or nested sequences of sections) in the page.
   */
  readonly sections: readonly NodeConfig<S>[];
}

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
export interface SectionConfig<S extends TutorialSchema = TutorialSchema> {
  readonly kind: "section";
  /**
   * The internal name of the section.
   */
  readonly name: keyof S["properties"]["sections"]["properties"];
  /**
   * The contents of the section.
   */
  readonly body:
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
   * Disables the numbered/lettered label for the section.
   */
  readonly noLabel?: true;
  /** Configuration  */
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

export const section = <S extends TutorialSchema>(
  c: Omit<SectionConfig<S>, "kind">
): SectionConfig<S> => ({ kind: "section", ...c });

export const sequence = <S extends TutorialSchema>(
  c: Omit<SequenceConfig<S>, "kind">
): SequenceConfig<S> => ({ kind: "sequence", ...c });

export const oneOf = <
  S extends TutorialSchema,
  C extends { readonly [k: string]: NodeConfig<S> }
>(
  c: Omit<OneOfConfig<S, C>, "kind">
): OneOfConfig<S, C> => ({ kind: "oneOf", ...c });

/**
 * Configuration for a hint.
 */
export interface HintConfig<S extends TutorialSchema> {
  /**
   * The internal name of the hint.
   */
  readonly name: keyof S["properties"]["hints"]["properties"];
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
