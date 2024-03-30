import { getTutorial, updateTutorial } from "@/api/client";
import { LoadingAnimation, Prose, SectionBox } from "@/components";
import { cx, JsxElement } from "@/helpers/client";
import { Updates } from "@/reactivity";
import { TutorialState } from "@/schema/tutorial";
import { decode } from "@/schema/types";
import { AlertIcon, CheckCircleIcon, SyncIcon } from "@primer/octicons-react";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TutorialConfig } from "../config";
import { Root } from "../state-tree";
import styles from "./tutorial-state-root.module.scss";

type SavedStatus = "initial" | "saving" | "saved" | "unsaved" | "error";

export const TutorialStateRoot = ({
  config,
  routeElement,
  courseId,
}: {
  config: TutorialConfig;
  routeElement: JsxElement;
  /** No `courseId` means Instructor Mode. */
  courseId: string | undefined;
}) => {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
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
    [],
  );

  useEffect(() => {
    loadInitialTutorialState();
    async function loadInitialTutorialState() {
      if (!courseId) {
        setStatus("loaded");
        return;
      }

      setStatus("loading");
      console.info("tutorial: fetching saved data");

      const result = await getTutorial({
        tutorialId: config.id,
        courseId,
      });

      if (result.failed) {
        if (result.error.type === "404 NOT FOUND") {
          console.info("tutorial: no saved data found");
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
        console.warn("tutorial: invalid saved data found");
        setStatus("loaded");
        return;
      }

      console.info("tutorial: saved data found");
      setInitial(decoded.value);
      setStatus("loaded");
      if (setSavedStatusRef.current) {
        setSavedStatusRef.current("saved");
      }
      return;
    }
  }, [config, courseId]);

  const save = useCallback(
    async (tutorialState: any) => {
      if (!courseId) {
        return;
      }

      const setSavedStatus = setSavedStatusRef.current || (() => undefined);

      const newVersion = version.current; // Already incremented in onChange
      console.info("tutorial: updating version:", newVersion);

      if (
        inFlightVersion.current === undefined ||
        inFlightVersion.current < newVersion
      ) {
        inFlightVersion.current = newVersion;
      }

      setSavedStatus("saving");

      const result = await updateTutorial(
        {
          tutorialId: config.id,
          courseId,
        },
        {
          version: newVersion,
          state: tutorialState,
          events: [],
        },
      );

      if (inFlightVersion.current === newVersion) {
        inFlightVersion.current = undefined;
      }

      if (result.failed) {
        setSavedStatus("error");
        console.error("tutorial: failed to save", result.error);
        if (result.error.type === "CONNECTION") {
          // window.alert(
          //   "Sorry, but we couldn’t save your changes.\n" +
          //     "This might be due to trouble with your internet connection."
          // );
        } else {
          // window.alert(
          //   "Sorry, but we couldn’t save your changes.\n" +
          //     "This seems to be an error on our end.\n" +
          //     "Try refreshing, or try again later."
          // );
        }
      } else {
        if (version.current === newVersion) {
          // Otherwise there are new unsaved changes.
          setSavedStatus("saved");
        }
        if (lastSavedVersion.current < newVersion) {
          lastSavedVersion.current = newVersion;
        }
        console.info("tutorial: updated version", newVersion);
      }
    },
    [config, courseId],
  );

  const debouncedSave = useMemo(
    () =>
      debounce(save, 5 * 1000, {
        maxWait: 60 * 1000,
        leading: false,
        trailing: true,
      }),
    [save],
  );

  const latestTutorialState = useRef<any>();

  const onChange = useCallback(
    (newTutorialState: any, _: Updates<TutorialState>) => {
      version.current++;
      latestTutorialState.current = newTutorialState;
      if (setSavedStatusRef.current) {
        setSavedStatusRef.current("unsaved");
      }
      debouncedSave(newTutorialState);
    },
    [debouncedSave],
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
      // eslint-disable-next-line no-param-reassign
      e.returnValue = "Your work has not been saved yet.";
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [save, debouncedSave]);

  switch (status) {
    case "loading":
      return (
        <SectionBox>
          <LoadingAnimation size="large" />
        </SectionBox>
      );
    case "error":
      return (
        <SectionBox>
          <Prose>
            <h1>Error</h1>

            <p>Sorry, we had trouble loading your saved tutorial.</p>
          </Prose>
        </SectionBox>
      );
    case "loaded":
      return (
        <>
          <Root
            // Changing the key destroys and remounts this component.  This is
            // the appropriate thing to do when we've reloaded the state from
            // the server because the courseId or mode switched.
            key={courseId || "InstructorMode"}
            overrideRootField={config.schema}
            initial={initial}
            onChange={onChange}
          >
            {routeElement}
          </Root>

          {courseId && <SavedStatus subscribe={savedStatusSubscribe} />}
        </>
      );
  }
};

function SavedStatus({
  subscribe,
}: {
  subscribe: (setter: (s: SavedStatus) => void) => () => void;
}): JSX.Element | null {
  const [status, setStatus] = useState<SavedStatus>("initial");

  useEffect(() => subscribe(setStatus), [subscribe]);

  switch (status) {
    case "initial":
      return null;
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
          Saving failed
        </div>
      );
  }
}

const EllipsisCircleIcon = () => (
  <svg
    aria-hidden="true"
    role="img"
    className="octicon"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    style={{
      display: "inline-block",
      userSelect: "none",
      verticalAlign: "text-bottom",
    }}
  >
    <circle
      stroke="currentColor"
      cy="8"
      cx="8"
      strokeWidth="1.4"
      fill="none"
      r="7.2"
    />
    <g fill="currentColor">
      <circle cy="8" cx="8" r="1.2" />
      <circle cy="8" cx="11.2" r="1.2" />
      <circle cy="8" cx="4.8" r="1.2" />
    </g>
  </svg>
);
