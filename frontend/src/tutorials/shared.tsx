import {
  AlertIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  SyncIcon,
} from "@primer/octicons-react";
import debounce from "lodash.debounce";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Outlet, Route, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAccount } from "src/account";
import * as api from "src/api";
import * as s from "src/common/schema";
import { names } from "src/common/tutorials";
import { Continue, Prose } from "src/components";
import { Content, Header, Page } from "src/components/layout";
import { UserMenu } from "src/components/shared/UserMenu";
import * as globalParams from "src/globalParams";
import { Field, Provider, ProviderSchema } from "src/state";
import { ReactComponent as EllipsisCircleIcon } from "src/svgs/ellipsis-circle.svg";
import * as urls from "src/urls";
import { Children, classes, useToggle } from "src/util";
import Feedback from "./Feedback";
import styles from "./shared.module.scss";

type LabelTitle =
  | {
      label: string;
      /** The page title in the browser */
      title?: string;
    }
  | {
      label: React.ReactElement;
      /** The page title in the browser */
      title: string;
    };

type Part = {
  path: string;
  element: React.ReactElement;
} & LabelTitle;

type Parts = Part[];

function getTitle({ label, title }: LabelTitle): string {
  return title !== undefined ? title : (label as string);
}

export function tutorialRoute({
  url,
  name,
  schema,
  intro,
  parts,
  ...labelTitle
}: {
  url: urls.URL;
  name: string;
  schema: ProviderSchema;
  intro: React.ReactNode;
  parts: Parts;
} & LabelTitle) {
  if (names[name] !== schema) {
    throw new Error(`Tutorial name "${name}" doesn't match the given schema.`);
  }

  parts = parts.concat([
    {
      path: "feedback",
      element: <Feedback />,
      label: "Feedback",
      title: "Feedback",
    },
  ]);

  return (
    <Route
      path={url.path}
      element={
        <Tutorial
          url={url}
          name={name}
          schema={schema}
          parts={parts}
          {...labelTitle}
        />
      }
    >
      <Route
        path="/"
        element={
          <Content>
            <h1 className="prose">{labelTitle.label}</h1>

            {intro}

            <Prose className={styles.genericIntroProse}>
              <p>
                <strong>
                  This activity is not about “right” or “wrong” answers,
                </strong>{" "}
                it’s about helping you to think about challenging ideas.
              </p>

              <p>And it won’t be graded (except for participation credit).</p>

              <p>
                <strong>
                  Take your time. If you get stuck, try the hints, and then give
                  it your best guess.
                </strong>{" "}
                There might be some follow-up questions that clear things up for
                you. Go back and change your answers if you want. Or—feel
                confident, and don’t!
              </p>

              <p>
                <strong>
                  Learning doesn’t stop once you’ve submitted your answers.
                </strong>{" "}
                We hope this activity helps you learn something today. If it
                does, it’ll be thanks to you, not us.
              </p>

              <p>
                Oh—<strong>have some scrap paper ready</strong> and draw and
                work things out for yourself.
              </p>

              <p>Good luck!</p>

              <p>
                <em>- Giaco, Ben, Steve, Gina, and Homeyra</em>
              </p>

              <p>
                <em>P.S. Your work will be saved automatically.</em>
              </p>
            </Prose>

            <Continue label="Let’s get going" link={parts[0].path} />
          </Content>
        }
      />

      {parts.map((part) => (
        <Route key={part.path} path={part.path} element={part.element} />
      ))}

      <Route
        path="finished"
        element={
          <Content>
            <Prose>
              <h1>All finished for today</h1>

              <p>
                <CheckCircleIcon
                  size="medium"
                  verticalAlign="middle"
                  className="text-green"
                />
                &nbsp;&nbsp;
                <strong>Nice job, and thanks for the feedback!</strong>
              </p>

              <p>
                Come back to see or update your work anytime (even if you close
                this window).
              </p>
            </Prose>
          </Content>
        }
      />
    </Route>
  );
}

interface TutorialContext {
  parts: Parts;
}
const TutorialContext = React.createContext<TutorialContext>({ parts: [] });

function Tutorial({
  url,
  name,
  schema,
  parts,
  ...labelTitle
}: {
  url: urls.URL;
  name: string;
  schema: ProviderSchema;
  parts: Parts;
} & LabelTitle) {
  const account = useAccount();

  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  const version = useRef(0);
  const lastSavedVersion = useRef(-Infinity);
  const inFlightVersion = useRef<number>();

  const [initial, setInitial] = useState<any>();

  const setSavedStatusRef = useRef<(s: SavedStatus) => void>();
  const savedStatusSubscribe = useCallback(
    (setter: (s: SavedStatus) => void) => {
      setSavedStatusRef.current = setter;
      return () => (setSavedStatusRef.current = undefined);
    },
    []
  );

  useEffect(() => {
    const loadTutorial = async () => {
      if (!account.isLoggedIn) {
        return;
      }

      setStatus("loading");
      console.log("tutorial: fetching saved data");

      const result = await api.getTutorial({
        learnerId: account.learner.learnerId,
        tutorial: name,
      });

      if (result.failed) {
        if (result.error.type === 404) {
          console.log("tutorial: no saved data found");
          setStatus("loaded");
          return;
        } else {
          console.error("tutorial: failed to load");
          setStatus("error");
          return;
        }
      }

      version.current = result.value.version;
      if (version.current > lastSavedVersion.current) {
        lastSavedVersion.current = version.current;
      }

      const decoded = schema.decode(result.value.tutorialData);

      if (s.isFailure(decoded)) {
        // TODO: Handle this by not throwing everything away!
        console.log("tutorial: invalid saved data found");
        setStatus("loaded");
        return;
      }

      console.log("tutorial: saved data found");
      setInitial(decoded.value);
      setStatus("loaded");
      if (setSavedStatusRef.current) {
        setSavedStatusRef.current("saved");
      }
      return;
    };
    loadTutorial();
  }, [account, name, schema]);

  const save = useCallback(
    async (
      account: ReturnType<typeof useAccount>,
      name: string,
      tutorialData: any
    ) => {
      if (!account.isLoggedIn) {
        return;
      }

      const setSavedStatus = setSavedStatusRef.current || (() => undefined);

      const newVersion = version.current; // Already incremented in onChange
      console.log("tutorial: updating version:", newVersion);

      if (
        inFlightVersion.current === undefined ||
        inFlightVersion.current < newVersion
      ) {
        inFlightVersion.current = newVersion;
      }

      setSavedStatus("saving");
      const result = await api.updateTutorial({
        learnerId: account.learner.learnerId,
        tutorial: name,
        version: newVersion,
        tutorialData,
      });

      if (inFlightVersion.current === newVersion) {
        inFlightVersion.current = undefined;
      }

      if (result.failed) {
        setSavedStatus("error");
        console.error("tutorial: failed to save", result.error);
        if (result.error.type === "CONNECTION") {
          window.alert(
            "Sorry, but we couldn’t save your changes.\n" +
              "This might be due to trouble with your internet connection."
          );
        } else {
          window.alert(
            "Sorry, but we couldn’t save your changes.\n" +
              "This seems to be an error on our end.\n" +
              "Try refreshing, or try again later."
          );
        }
      } else {
        if (version.current === newVersion) {
          // Otherwise there are new unsaved changes.
          setSavedStatus("saved");
        }
        if (lastSavedVersion.current < newVersion) {
          lastSavedVersion.current = newVersion;
        }
        console.log("tutorial: updated version", newVersion);
      }
    },
    []
  );

  const debouncedSave = useMemo(
    () =>
      debounce(save, 5 * 1000, {
        maxWait: 60 * 1000,
        leading: true,
        trailing: true,
      }),
    [save]
  );

  const latestTutorialData = useRef<any>();

  const onChange = useCallback(
    (tutorialData: any) => {
      version.current++;
      latestTutorialData.current = tutorialData;
      if (setSavedStatusRef.current) {
        setSavedStatusRef.current("unsaved");
      }
      debouncedSave(account, name, tutorialData);
    },
    [account, name, debouncedSave]
  );

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (!latestTutorialData.current) {
        // Guess nothing ever changed.
        return;
      }
      if (lastSavedVersion.current >= version.current) {
        // Nothing new to save.
        return;
      }
      if (
        inFlightVersion.current === undefined ||
        inFlightVersion.current < version.current
      ) {
        // Nothing is currently being saved, or changes have been made since the
        // last save, so let's trigger another one!  But first let's prevent the
        // last debounced ones from firing anymore.
        debouncedSave.cancel();
        save(account, name, latestTutorialData.current);
      }
      e.preventDefault();
      e.returnValue = "Your work has not been saved yet.";
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [account, name, save, debouncedSave]);

  const { currentTitle } = useCurrentPageInfo(parts, labelTitle);

  const tutorialContext: TutorialContext = useMemo(() => ({ parts }), [parts]);

  if (!account.isLoggedIn) {
    // We really should never get here.
    return (
      <Content>
        <Prose>
          You have to <Link to={urls.Login.link}>log in</Link> to see this page.
        </Prose>
      </Content>
    );
  }

  return (
    <Page title={currentTitle}>
      <TutorialHeader
        url={url}
        parts={parts}
        savedStatusSubscribe={savedStatusSubscribe}
        {...labelTitle}
      />

      <main className={styles.tutorialMain}>
        <div className={styles.tutorialContent}>
          {status === "loading" && (
            <Content className="prose">
              <h1>Loading…</h1>

              <p>
                Hold up just a second, we’re loading this tutorial for you{" "}
                <span role="img" aria-label="happy cat">
                  😸
                </span>
              </p>
            </Content>
          )}

          {status === "error" && (
            <Content>
              <Prose className="error">Sorry, something went wrong.</Prose>
            </Content>
          )}

          {status === "loaded" && (
            <Provider schema={schema} initial={initial} onChange={onChange}>
              {globalParams.mockApi && (
                <Content>
                  <Prose className={styles.notForCreditAlert}>
                    You’re currently in <strong>preview mode</strong>. Your
                    responses will <strong>not</strong> be saved.
                  </Prose>
                </Content>
              )}

              {!globalParams.mockApi && !account.isForCredit && (
                <Content>
                  <Prose className={styles.notForCreditAlert}>
                    This is an anonymous account. Your work will{" "}
                    <strong>not</strong> count for any course credit.
                  </Prose>
                </Content>
              )}

              <TutorialContext.Provider value={tutorialContext}>
                <Outlet />
              </TutorialContext.Provider>
            </Provider>
          )}
        </div>
      </main>
    </Page>
  );
}

function TutorialHeader({
  url,
  parts,
  savedStatusSubscribe,
  ...labelTitle
}: {
  url: urls.URL;
  parts: Parts;
  savedStatusSubscribe: (setter: (s: SavedStatus) => void) => () => void;
} & LabelTitle) {
  const [toggled, setToggled, sidebarElRef] = useToggle();

  const { page, currentTitle } = useCurrentPageInfo(parts, labelTitle);

  return (
    <Header>
      <div
        className={classes(styles.sidebarToggle, [styles.toggled, toggled])}
        onClick={() => setToggled((t) => !t)}
      >
        <svg viewBox="0 0 120 100" width="1em" height="1em">
          <rect className={styles.ht} y="14" x="10" width="100" height="12" />
          <rect className={styles.hm1} y="44" x="10" width="100" height="12" />
          <rect className={styles.hm2} y="44" x="10" width="100" height="12" />
          <rect className={styles.hb} y="74" x="10" width="100" height="12" />
        </svg>
      </div>

      <div className={styles.headerTitle}>
        <span className="prose">{currentTitle}</span>
      </div>

      <Link
        to={urls.Tutorials.link}
        className={classes(
          styles.otherTutorialsLink,
          styles.otherTutorialsLinkFixed
        )}
      >
        <ArrowLeftIcon />
        Other tutorials
      </Link>

      <nav
        className={classes(styles.sidebar, [styles.toggled, toggled])}
        ref={sidebarElRef}
      >
        <Link
          to={urls.Tutorials.link}
          className={classes(
            styles.otherTutorialsLink,
            styles.otherTutorialsLinkInline
          )}
        >
          <ArrowLeftIcon />
          Other tutorials
        </Link>

        <p className={styles.sidebarTutorialTitle}>
          <span className="prose">{labelTitle.label}</span>
        </p>

        <ol className={styles.tutorialParts}>
          <TutorialPartsItem
            active={url.path === page}
            link={url.link}
            label="Introduction"
          />

          {parts.map((part) => (
            <TutorialPartsItem
              key={part.path}
              active={part.path === page}
              link={urls.part(url, part.path)}
              label={part.label}
            />
          ))}
        </ol>
      </nav>

      <UserMenu />

      <SavedStatus subscribe={savedStatusSubscribe} />
    </Header>
  );
}

function TutorialPartsItem({
  active,
  link,
  label,
}: {
  active: boolean;
  link: string;
  label: React.ReactNode;
}) {
  return (
    <li className={classes([styles.active, active])}>
      {active ? (
        <span className={classes(styles.part, "prose")}>{label}</span>
      ) : (
        <Link className={styles.part} to={link}>
          <span className="prose">{label}</span>
        </Link>
      )}
    </li>
  );
}

function useCurrentPart(parts: Parts) {
  const location = useLocation();

  const page = location.pathname.replace(/\/$/, "").split("/").pop();

  const currentPart = parts.find((part) => part.path === page);

  return { page, currentPart };
}

function useCurrentPageInfo(parts: Parts, labelTitle: LabelTitle) {
  const { page, currentPart } = useCurrentPart(parts);
  const currentTitle = getTitle(currentPart || labelTitle);

  return { page, currentPart, currentTitle };
}

type SavedStatus = "initial" | "saving" | "saved" | "unsaved" | "error";

function SavedStatus({
  subscribe,
}: {
  subscribe: (setter: (s: SavedStatus) => void) => () => void;
}): JSX.Element {
  const [status, setStatus] = useState<SavedStatus>("initial");

  useEffect(() => subscribe(setStatus), [subscribe]);

  switch (status) {
    case "initial":
      return <div className={styles.savedStatus}></div>;
    case "saving":
      return (
        <div className={styles.savedStatus}>
          <SyncIcon />
          Saving changes…
        </div>
      );
    case "saved":
      return (
        <div className={styles.savedStatus}>
          <CheckCircleIcon />
          Saved changes
        </div>
      );
    case "unsaved":
      return (
        <div className={styles.savedStatus}>
          <EllipsisCircleIcon />
          Unsaved changes…
        </div>
      );
    case "error":
      return (
        <div className={classes(styles.savedStatus, styles.savedStatusError)}>
          <AlertIcon />
          SAVING FAILED!
        </div>
      );
  }
}

export function Part({
  label,
  children,
}: {
  label: React.ReactNode;
} & Children) {
  useEffect(() => {
    // Make sure we've scrolled back to the top
    window.scroll(window.scrollX, 0);
  }, []);

  return (
    <>
      <Content className="prose">
        <h1>{label}</h1>
      </Content>

      {children}
    </>
  );
}

const exclamations = ["Cool!", "Rad!", "Nifty!", "Sweet!", "Neat!"];

export function useNextPartLink() {
  const { parts } = useContext(TutorialContext);

  const { currentPart } = useCurrentPart(parts);

  const nextPart: Part | undefined =
    currentPart === undefined
      ? parts[0] // Presumably we're currently on the intro page
      : parts[parts.indexOf(currentPart) + 1];

  return nextPart === undefined
    ? undefined
    : currentPart === undefined
    ? `./${nextPart.path}`
    : `../${nextPart.path}`;
}

export function ContinueToNextPart({
  commit,
}: {
  commit: Field<s.BooleanSchema>;
}) {
  const randomExplanation = useRef(
    exclamations[Math.floor(Math.random() * exclamations.length)]
  );

  const link = useNextPartLink();

  return (
    <>
      <Prose>
        {randomExplanation.current} We encourage you to continue to think about
        these concepts and chat with your professor, TA, or classmates.{" "}
        <strong className="text-blue">
          This isn’t about being “right” or “wrong,” and we haven‘t “checked”
          all your answers.
        </strong>
      </Prose>

      {link && (
        <Continue
          link={link}
          commit={commit}
          label="Move on to the next page"
        />
      )}
    </>
  );
}
