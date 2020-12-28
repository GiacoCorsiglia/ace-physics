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
      html: Html;
      /**
       * The version of the label for display in the browser tab bar.
       */
      title: string;
    };

/**
 * Configuration for a tutorial.
 */
export interface TutorialConfig<S extends TutorialSchema = TutorialSchema> {
  /**
   * The schema for the tutorial.
   */
  schema: S;
  /**
   * The link for the tutorial ("/tutorials/{this-part-of-the-link-only}")
   */
  link: string;
  /**
   * The tutorial's title.
   */
  label: Label;
  /**
   * Snippet of Html to show in the sidebar.
   */
  info?: Html;
  /**
   * Whether the tutorial has a pretest page.
   */
  pretest: boolean;
  /**
   * The list of pages in the tutorial to include in the sidebar.
   */
  pages: {
    /**
     * The page's link ("tutorials/tutorial-name/{this-part-of-the-link-only}").
     */
    link: string;
    /**
     * The label for the page in the sidebar.
     */
    label: Html;
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
  body: Html;
}

/**
 * Configuration for the pretest page.
 */
export interface PretestConfig<S extends TutorialSchema = TutorialSchema> {
  /**
   * The sections in the pretest.
   */
  sections: PretestSectionConfig<S>[];
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
  body:
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
  name: keyof S["properties"]["pages"]["properties"];
  /**
   * The page's title.
   */
  label: Label;
  /**
   * The sections (or nested sequences of sections) in the page.
   */
  sections: NodeConfig<S>[];
}

/**
 * Configuration for a node in the section tree of a body page.
 */
export type NodeConfig<S extends TutorialSchema = TutorialSchema> =
  | SectionConfig<S>
  | SequenceConfig<S>;

type When<S extends TutorialSchema> = (
  responses: NonNullable<TutorialState<S>["responses"]>,
  state: TutorialState<S>
) => boolean;

/**
 * Configuration for a section of a body page.
 */
export interface SectionConfig<S extends TutorialSchema = TutorialSchema> {
  kind: "section";
  /**
   * The internal name of the section.
   */
  name: keyof S["properties"]["sections"]["properties"];
  /**
   * The contents of the section.
   */
  body:
    | Html
    | ((
        models: Models<S>["responses"]["properties"],
        state: TutorialState<S>
      ) => Html);
  /**
   * Conditional logic dictating when the section should be revealed.
   */
  when?: When<S>;
  /** Configuration  */
  hints?: Array<HintConfig<S> | Array<HintConfig<S>>>;
  /**
   * Configuration for the section's continue button.
   */
  continue?: {
    /**
     * The continue button's label.
     */
    label?: Html | ((state: TutorialState<S>) => Html);
    /**
     * Conditional logic dictating when the continue button should be enabled.
     * By default, the button will only be enabled when all models used in the
     * section's body are set.
     * @param state The current TutorialState.
     * @param allowed The original determination of whether the button should be
     * enabled based on the default logic.
     */
    allowed?: (state: TutorialState<S>, allowed: boolean) => boolean;
  };
}

/**
 * Configuration for a sequence of sections in the section tree of a body page.
 */
export interface SequenceConfig<S extends TutorialSchema = TutorialSchema> {
  kind: "sequence";
  /**
   * Conditional logic dictating when the sequence should be revealed.
   */
  when?: When<S>;
  /**
   * The sections inside this sequence.
   */
  sections: NodeConfig<S>[];
}

export const section = <S extends TutorialSchema>(
  c: Omit<SectionConfig<S>, "kind">
): SectionConfig<S> => ({ kind: "section", ...c });

export const sequence = <S extends TutorialSchema>(
  c: Omit<SequenceConfig<S>, "kind">
): SequenceConfig<S> => ({ kind: "sequence", ...c });

/**
 * Configuration for a hint.
 */
interface HintConfig<S extends TutorialSchema> {
  name: keyof S["properties"]["hints"]["properties"];
  body:
    | Html
    | ((models: Models<S>, state: TutorialState<S>) => Html)
    | "disable";
  label?: Html | ((state: TutorialState<S>) => Html);
  when?: (state: TutorialState<S>) => boolean;
}
