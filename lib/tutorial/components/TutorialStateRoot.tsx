import { getTutorial, updateTutorial } from "@/api/client";
import { Prose } from "@/design";
import { Content } from "@/design/layout";
import { JsxElement } from "@/helpers/frontend";
import { Learner } from "@/schema/db";
import { TutorialState } from "@/schema/tutorial";
import { decode } from "@/schema/types";
import EllipsisCircleIcon from "@/svgs/ellipsis-circle.svg";
import { AlertIcon, CheckCircleIcon, SyncIcon } from "@primer/octicons-react";
import { cx } from "linaria";
import debounce from "lodash.debounce";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TutorialConfig } from "../config";
import { Root } from "../state-tree";
import styles from "./shared.module.scss";
import TutorialLoading from "./TutorialLoading";

type SavedStatus = "initial" | "saving" | "saved" | "unsaved" | "error";

export function TutorialStateRoot({
  config,
  routeElement,
  learner,
}: {
  config: TutorialConfig;
  routeElement: JsxElement;
  learner: Learner;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  const version = useRef(0);
  const lastSavedVersion = useRef(-Infinity);
  const inFlightVersion = useRef<number>();

  const [initial, setInitial] = useState<TutorialState>({});

  const setSavedStatusRef = useRef<(s: SavedStatus) => void>();
  const savedStatusSubscribe = useCallback(
    (setter: (s: SavedStatus) => void) => {
      setSavedStatusRef.current = setter;
      return () => (setSavedStatusRef.current = undefined);
    },
    []
  );

  useEffect(() => {
    loadInitialTutorialState();
    async function loadInitialTutorialState() {
      setStatus("loading");
      console.log("tutorial: fetching saved data");

      const result = await getTutorial({
        learnerId: learner.learnerId,
        tutorial: config.name,
        edition: config.edition,
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

      const decoded = decode(config.schema.type, result.value.state);

      if (decoded.failed) {
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
    }
  }, [learner, config]);

  const save = useCallback(
    async (tutorialState: any) => {
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

      const result = await updateTutorial({
        learnerId: learner.learnerId,
        tutorial: config.name,
        edition: config.edition,
        version: newVersion,
        state: tutorialState,
        events: [],
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
    [config, learner]
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

  const latestTutorialState = useRef<any>();

  const onChange = useCallback(
    (newTutorialState: any) => {
      version.current++;
      latestTutorialState.current = newTutorialState;
      if (setSavedStatusRef.current) {
        setSavedStatusRef.current("unsaved");
      }
      debouncedSave(newTutorialState);
    },
    [debouncedSave]
  );

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (!latestTutorialState.current) {
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
        save(latestTutorialState.current);
      }
      e.preventDefault();
      e.returnValue = "Your work has not been saved yet.";
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [save, debouncedSave]);

  switch (status) {
    case "loading":
      return <TutorialLoading />;
    case "error":
      return (
        <Content>
          <Prose>
            <h1>Error</h1>

            <p>Sorry, we had trouble loading your saved tutorial.</p>
          </Prose>
        </Content>
      );
    case "loaded":
      return (
        <>
          <Root
            overrideRootField={config.schema}
            initial={initial}
            onChange={onChange}
          >
            {routeElement}
          </Root>

          <SavedStatus subscribe={savedStatusSubscribe} />
        </>
      );
  }
}

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
        <div className={cx(styles.savedStatus, styles.savedStatusError)}>
          <AlertIcon />
          SAVING FAILED!
        </div>
      );
  }
}
