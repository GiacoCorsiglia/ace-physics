import {
  Breadcrumb,
  Button,
  MainContentBox,
  Prose,
  Vertical,
} from "@/components";
import { Html } from "@/helpers/client";
import { TutorialSchema, TutorialState } from "@/schema/tutorial";
import { BodyPage } from "@/tutorial/components/body-page";
import { PageConfig, TutorialConfig } from "@/tutorial/config";
import { Root } from "@/tutorial/state-tree";
import { ArrowLeftIcon, IssueReopenedIcon } from "@primer/octicons-react";
import Head from "next/head";
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";

interface TutorialRouteComponent<S extends TutorialSchema> {
  config: PageConfig<any>;
  tutorialConfig: TutorialConfig<S>;
}

export const TutorialDemoPage = <S extends TutorialSchema>({
  tutorialPage,
  title,
  intro,
  initialState,
}: {
  tutorialPage: TutorialRouteComponent<S>;
  title: string;
  intro: Html;
  initialState: TutorialState<S>;
}) => {
  const [resetKey, resetKeyFn] = useReducer((x: number) => x + 1, 0);
  const [hasEdited, setHasEdited] = useState(false);

  const reset = () => {
    resetKeyFn();
    setHasEdited(false);
  };

  const onChange = useCallback(() => setHasEdited(true), []);

  return (
    <Vertical as="main" space={300} style={{ counterReset: "section" }}>
      <Head>
        <title>ACEPhysics.net Demo - {title}</title>
      </Head>

      <MainContentBox marginTop="small">
        <Breadcrumb
          items={[
            { link: "/", label: "Home" },
            { link: "/demo", label: "Demo" },
          ]}
        />

        <Prose>
          <h4>
            Demo: <em>{title}</em>
          </h4>

          {intro}

          <p>
            Your answers on this demo page <strong>will not be saved</strong>.
            Normally, students’ answers <em>are</em> saved automatically, so
            they can return any time to finish or refer to their work.
          </p>

          <p>
            Typically, there would be a table of contents for you to navigate
            between the tutorial’s pages, but this demo only includes this one
            page. Otherwise, this demo is identical to the actual tutorial page.
          </p>
        </Prose>

        <div style={{ display: "flex", marginTop: "2rem" }}>
          <Button color="blue" iconLeft={<ArrowLeftIcon />} link="/demo">
            Go back
          </Button>

          <Button
            color="yellow"
            iconLeft={<IssueReopenedIcon />}
            onClick={reset}
            style={{ marginLeft: "auto" }}
            disabled={!hasEdited}
          >
            Reset and start over
          </Button>
        </div>
      </MainContentBox>

      {/* Changing the key will destroy and re-mount this component. */}
      <Root
        key={resetKey}
        overrideRootField={tutorialPage.tutorialConfig.schema}
        initial={initialState}
        onChange={onChange}
      >
        <DemoContext.Provider value={true}>
          <BodyPage
            tutorialConfig={tutorialPage.tutorialConfig}
            config={tutorialPage.config}
            showWhenComplete={
              <>
                <Prose>
                  Normally, there’d be a link to the next page here! This demo
                  only has one page.
                </Prose>

                <div style={{ display: "flex", marginTop: "2rem" }}>
                  <Button
                    color="blue"
                    iconLeft={<ArrowLeftIcon />}
                    link="/demo"
                  >
                    Go back
                  </Button>

                  <Button
                    color="yellow"
                    iconLeft={<IssueReopenedIcon />}
                    onClick={reset}
                    style={{ marginLeft: "auto" }}
                  >
                    Reset and start over
                  </Button>
                </div>
              </>
            }
          />
        </DemoContext.Provider>
      </Root>
    </Vertical>
  );
};

const DemoContext = createContext(false);

export const DemoOnly = ({ children }: { children?: Html }) => {
  if (!useContext(DemoContext)) {
    return null;
  }
  return <>{children}</>;
};
