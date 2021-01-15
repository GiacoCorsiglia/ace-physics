import { JsxElement } from "@/helpers/frontend";
import { TutorialSchema } from "@/schema/tutorial";
import BodyPage from "./components/BodyPage";
import FeedbackPage from "./components/FeedbackPage";
import IntroPage from "./components/IntroPage";
import PretestPage from "./components/PretestPage";
import TutorialRoot from "./components/TutorialRoot";
import * as c from "./config";

const id = (x: any) => x;

interface TutorialRoute {
  (): JsxElement;
  // These are optional because it makes initializing them easier.
  displayName?: string;
  layout?: ReturnType<typeof layout>;
}

const layout = (tutorialConfig: c.TutorialConfig) => (Route: TutorialRoute) => (
  <TutorialRoot config={tutorialConfig} routeElement={<Route />} />
);

/**
 * Creates the introduction page for the given tutorial setup.
 */
export const intro = <S extends TutorialSchema>(
  tutorialConfig: c.TutorialConfig<S>,
  factory: () => c.IntroConfig<S>
) => {
  const config = factory();

  const Component: TutorialRoute = () => (
    <IntroPage config={config} tutorialConfig={tutorialConfig} />
  );
  Component.displayName = `TutorialRoute:Intro`;
  Component.layout = layout(tutorialConfig);

  return Component;
};

/**
 * Creates the pretest page for the given tutorial setup.
 */
export const pretest = <S extends TutorialSchema>(
  tutorialConfig: c.TutorialConfig<S>,
  factory: (constructors: {
    /** Creates a section in the pretest. */
    section: (c: c.PretestSectionConfig<S>) => c.PretestSectionConfig<S>;
  }) => c.PretestConfig<S>
) => {
  const config = factory({ section: id });

  const Component: TutorialRoute = () => (
    <PretestPage config={config} tutorialConfig={tutorialConfig} />
  );
  Component.displayName = `TutorialRoute:Pretest`;
  Component.layout = layout(tutorialConfig);

  return Component;
};

/**
 * Creates a body page (aka a "part") for the given tutorial setup.
 */
export const page = <S extends TutorialSchema>(
  tutorialConfig: c.TutorialConfig<S>,
  factory: (constructors: {
    /** Creates a section in the page. */
    section: Constructor<c.SectionConfig<S>>;
    /** Creates a sequence of sections in the page.  */
    sequence: Constructor<c.SequenceConfig<S>>;
    /** Creates a hint */
    hint: (c: c.HintConfig<S>) => c.HintConfig<S>;
  }) => c.PageConfig<S>
) => {
  // This factory exists only to facilitate TypeScript typing.
  const config = factory({
    section: c.section,
    sequence: c.sequence,
    hint: c.hint,
  });

  const Component: TutorialRoute = () => (
    <BodyPage
      config={config as c.PageConfig<TutorialSchema>}
      tutorialConfig={tutorialConfig}
    />
  );
  Component.displayName = `TutorialRoute:Page:${config.name}`;
  Component.layout = layout(tutorialConfig);

  return Component;
};

type Constructor<T> = (c: Omit<T, "kind">) => T;

/**
 * Creates  the feedback page for the given tutorial setup.
 */
export const feedback = <S extends TutorialSchema>(
  tutorialConfig: c.TutorialConfig<S>
) => {
  const Component: TutorialRoute = () => <FeedbackPage />;
  Component.displayName = `TutorialRoute:Feedback`;
  Component.layout = layout(tutorialConfig);

  return Component;
};
