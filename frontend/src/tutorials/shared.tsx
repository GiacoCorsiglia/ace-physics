import debounce from "lodash.debounce";
import React, {
  useCallback,
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
import { Provider, ProviderSchema } from "src/state";
import * as urls from "src/urls";
import { Children, classes } from "src/util";
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

            <Link to={parts[0].path}>
              <Continue label="Let's get started" link={parts[0].path} />
            </Link>
          </Content>
        }
      />

      {parts.map((part) => (
        <Route key={part.path} path={part.path} element={part.element} />
      ))}
    </Route>
  );
}

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
  const location = useLocation();
  const account = useAccount();

  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  const version = useRef<number>(0);

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

  const debouncedSave = useMemo(
    () =>
      debounce(
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

          setSavedStatus("saving");
          const result = await api.updateTutorial({
            learnerId: account.learner.learnerId,
            tutorial: name,
            version: newVersion,
            tutorialData,
          });

          if (result.failed) {
            setSavedStatus("error");
            console.error("tutorial: failed to save");
          } else {
            if (version.current === newVersion) {
              // Otherwise there are new unsaved changes.
              setSavedStatus("saved");
            }
            console.log("tutorial: updated version", newVersion);
          }
        },
        5 * 1000,
        {
          maxWait: 60 * 1000,
          leading: true,
          trailing: true,
        }
      ),
    []
  );

  const onChange = useCallback(
    (tutorialData: any) => {
      version.current++;
      if (setSavedStatusRef.current) {
        setSavedStatusRef.current("unsaved");
      }
      debouncedSave(account, name, tutorialData);
    },
    [account, name, debouncedSave]
  );

  if (!account.isLoggedIn) {
    // We really should never get here.
    return (
      <Content>
        <Prose>
          Please go <Link to={urls.Login.link}>login</Link>.
        </Prose>
      </Content>
    );
  }

  const page = location.pathname.replace(/\/$/, "").split("/").pop();

  const currentPart = parts.find((part) => part.path === page);
  const currentTitle = getTitle(currentPart || labelTitle);

  return (
    <Page title={currentTitle}>
      <Header>
        <nav className={styles.tutorialNav}>
          <p className={styles.tutorialLabel}>
            <Link to={url.link}>
              <span className="prose">{labelTitle.label}</span>
            </Link>
          </p>

          <ol className={styles.tutorialParts}>
            {parts.map((part) => (
              <li
                key={part.path}
                className={classes([styles.active, part.path === page])}
              >
                <Link to={urls.part(url, part.path)}>
                  <span className="prose">{part.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <UserMenu />

        <SavedStatus subscribe={savedStatusSubscribe} />
      </Header>

      <main>
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
            <Outlet />
          </Provider>
        )}
      </main>
    </Page>
  );
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
      return <div className={styles.savedStatus}>Saving changes…</div>;
    case "saved":
      return <div className={styles.savedStatus}>Saved changes ✓</div>;
    case "unsaved":
      return <div className={styles.savedStatus}>Unsaved changes</div>;
    case "error":
      return <div className={styles.savedStatus}>SAVING FAILED!</div>;
  }
}

export function Part({
  label,
  children,
}: {
  label: React.ReactNode;
} & Children) {
  return (
    <>
      <Content className="prose">
        <h1>{label}</h1>
      </Content>

      {children}
    </>
  );
}
