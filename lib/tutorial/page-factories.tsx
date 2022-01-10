import { JsxElement } from "@/helpers/client";
import { TutorialSchema } from "@/schema/tutorial";
import { cloneElement } from "react";
import BodyPage from "./components/BodyPage";
import FeedbackPage from "./components/FeedbackPage";
import IntroPage from "./components/IntroPage";
import PretestPage from "./components/PretestPage";
import TutorialRoot from "./components/TutorialRoot";
import * as c from "./config";

const id = (x: any) => x;

interface TutorialRouteProperties<C> {
  element: JsxElement;
  displayName: string;
  config: C;
  tutorialConfig: c.TutorialConfig;
}

interface TutorialRoute<C> extends TutorialRouteProperties<C> {
  (): JsxElement;
  layout: (Self: () => JsxElement) => JsxElement;
}

const routeComponent = <C,>(properties: TutorialRouteProperties<C>) => {
  const Component: TutorialRoute<C> = (() => properties.element) as any;

  Object.entries(properties).forEach(([key, value]) => {
    (Component as any)[key] = value;
  });

  Component.layout = (Self: () => JsxElement) => (
    <TutorialRoot config={properties.tutorialConfig} routeElement={<Self />} />
  );

  return Component;
};

export const withSetup = <C,>(
  route: TutorialRoute<C>,
  tutorialConfig: c.TutorialConfig
) =>
  routeComponent({
    ...route,
    tutorialConfig,
    element: cloneElement(route.element!, { tutorialConfig }),
  });

/**
 * Creates the introduction page for the given tutorial setup.
 */
export const intro = <S extends TutorialSchema>(
  tutorialConfig: c.TutorialConfig<S>,
  factory: () => c.IntroConfig<S>
) => {
  const config = factory();
  return routeComponent({
    element: (
      <IntroPage
        config={config as c.IntroConfig<TutorialSchema>}
        tutorialConfig={tutorialConfig}
      />
    ),
    displayName: `TutorialRoute:Intro`,
    config,
    tutorialConfig,
  });
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
  return routeComponent({
    element: (
      <PretestPage
        config={config as c.PretestConfig<TutorialSchema>}
        tutorialConfig={tutorialConfig}
      />
    ),
    displayName: `TutorialRoute:Pretest`,
    config,
    tutorialConfig,
  });
};

/**
 * Creates a body page (aka a "part") for the given tutorial setup.
 */
export const page = <S extends TutorialSchema>(
  tutorialConfig: c.TutorialConfig<S>,
  factory: (constructors: {
    /** Creates a section in the page. */
    section: <Name extends keyof S["properties"]["sections"]["properties"]>(
      c: Omit<c.SectionConfig<S, Name>, "kind">
    ) => c.SectionConfig<S, Name>;
    /** Creates a sequence of sections in the page.  */
    sequence: Constructor<c.SequenceConfig<S>>;
    /** Creates a sequence of sections in the page.  */
    oneOf: <C extends { readonly [k: string]: c.NodeConfig<S> }>(
      c: Omit<c.OneOfConfig<S, C>, "kind">
    ) => c.OneOfConfig<S, C>;
    /** Creates a hint */
    hint: (c: c.HintConfig<S>) => c.HintConfig<S>;
  }) => c.PageConfig<S>
) => {
  // This factory exists only to facilitate TypeScript typing.
  const config = factory({
    section: c.section,
    sequence: c.sequence,
    oneOf: c.oneOf,
    hint: c.hint,
  });
  return routeComponent({
    element: (
      <BodyPage
        config={config as unknown as c.PageConfig<TutorialSchema>}
        tutorialConfig={tutorialConfig}
      />
    ),
    displayName: `TutorialRoute:Page:${config.name}`,
    config,
    tutorialConfig,
  });
};

type Constructor<T> = (c: Omit<T, "kind">) => T;

/**
 * Creates  the feedback page for the given tutorial setup.
 */
export const feedback = <S extends TutorialSchema>(
  tutorialConfig: c.TutorialConfig<S>
) => {
  return routeComponent({
    element: <FeedbackPage tutorialConfig={tutorialConfig} />,
    displayName: `TutorialRoute:Feedback`,
    config: {},
    tutorialConfig,
  });
};
