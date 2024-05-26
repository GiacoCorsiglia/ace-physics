import { getTutorial, updateTutorial } from "@/api/client";
import { LoadingAnimation, Prose, SectionBox } from "@/components";
import {
  cx,
  Html,
  jsonLocalStorage,
  jsonSessionStorage,
  JsonStorage,
  JsxElement,
} from "@/helpers/client";
import { Updates } from "@/reactivity";
import { TUTORIAL_STATE_NO_COURSE } from "@/schema/db";
import { TutorialState } from "@/schema/tutorial";
import { any, decode, Infer, number, object } from "@/schema/types";
import { AlertIcon, CheckCircleIcon, SyncIcon } from "@primer/octicons-react";
import debounce from "lodash.debounce";
import { signIn } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TutorialConfig } from "../config";
import { Root } from "../state-tree";
import { Mode } from "./mode-manager";
import styles from "./tutorial-state-root.module.scss";

type SavedStatus = "initial" | "saving" | "saved" | "unsaved" | "error";

interface StorageConfig {
  storage: JsonStorage;
  key: string;
}

const getStorageConfig = (
  config: TutorialConfig,
  mode: Mode,
): StorageConfig | null => {
  const course = mode.type === "UnauthenticatedMode" ? "Unauthenticated" : null;

  if (!course) {
    return null;
  }

  // When unauthenticated, use session storage, so you can open the tutorial in
  // another tab to reset your state.
  const storage =
    mode.type === "UnauthenticatedMode" ? jsonSessionStorage : jsonLocalStorage;

  return {
    storage,
    key: `ace-tutorial:${config.id}:${course}`,
  };
};

type PersistedTutorialState = Infer<typeof PersistedTutorialState>;
const PersistedTutorialState = object({
  version: number(),
  state: any(),
});

type Status = "loading" | "loaded" | "error";

export const TutorialStateRoot = ({
  config,
  routeElement,
  mode,
}: {
  config: TutorialConfig;
  routeElement: JsxElement;
  mode: Mode;
}) => {
  // The course to associate saves with.  If unset, we're not persisting state
  // on the server (but possibly in local storage).
  const courseId =
    mode.type === "CourseMode"
      ? mode.courseId
      : mode.type === "ExplorationMode"
        ? TUTORIAL_STATE_NO_COURSE
        : undefined;

  const [status, setStatus] = useState<Status>("loading");

  const version = useRef(0);
  const lastSavedVersion = useRef(-Infinity);
  const inFlightVersion = useRef<number>();

  const [needsUnauthenticatedSavedStatus, setNeedsUnauthenticatedSavedStatus] =
    useState(false);

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
    const abortController = new AbortController();

    //
    // Helpers.
    //

    type LoadResult =
      | { type: "Some"; value: PersistedTutorialState }
      | { type: "None" }
      | { type: "Error" };

    const loadFromServer = async (): Promise<LoadResult> => {
      if (!courseId) {
        return { type: "None" };
      }

      console.info("tutorial: fetching saved data");

      const result = await getTutorial({
        tutorialId: config.id,
        courseId,
      });

      if (!result.failed) {
        return { type: "Some", value: result.value };
      }

      if (result.error.type === "404 NOT FOUND") {
        console.info("tutorial: no saved data found");
        return { type: "None" };
      }

      console.error("tutorial: failed to load");
      return { type: "Error" };
    };

    const loadFromStorage = ({ storage, key }: StorageConfig): LoadResult => {
      console.info("tutorial: reading state from storage");

      const stored = storage.getItem(key);
      const decoded = decode(PersistedTutorialState, stored);

      if (decoded.failed) {
        console.info("tutorial: nothing found in storage");
        return { type: "None" };
      }

      console.info("tutorial: found state in storage");
      return { type: "Some", value: decoded.value };
    };

    const loadInitialTutorialState = async () => {
      // Load state from the server.
      const serverResult = await loadFromServer();

      // Also load from storage.
      let storageResult: LoadResult = { type: "None" };

      // Try
      const storageConfig = getStorageConfig(config, mode);
      if (storageConfig) {
        storageResult = loadFromStorage(storageConfig);
      }

      // If we found nothing on the server nor in storage, try loading the
      // unauthenticated version from storage to see if we need to restore
      // unauthenticated state now that someone signed in.
      if (
        serverResult.type === "None" &&
        storageResult.type === "None" &&
        mode.type !== "UnauthenticatedMode" // Don't bother reading it twice.
      ) {
        const unauthenticatedStorageConfig = getStorageConfig(config, {
          type: "UnauthenticatedMode",
        });
        if (unauthenticatedStorageConfig) {
          console.info("tutorial: reading unauthenticated state from storage");

          // HACK: Read from localStorage, not sessionStorage, when trying to
          // restore unauthenticated state, because login happens across tabs
          // (i.e., across sessions).
          unauthenticatedStorageConfig.storage = jsonLocalStorage;

          storageResult = loadFromStorage(unauthenticatedStorageConfig);
        }
      }

      // Now we decide which one to use!

      // Always use the server result unless we found something in storage.
      if (storageResult.type !== "Some") {
        return serverResult;
      }

      // We found something in storage but didn't find anything on the server;
      // use storage!
      if (serverResult.type !== "Some") {
        return storageResult;
      }

      // We found something in storage AND on the server, so compare versions.
      return storageResult.value.version > serverResult.value.version
        ? storageResult
        : serverResult;
    };

    const handleLoadAndGetStatus = (loadResult: LoadResult): Status => {
      if (loadResult.type === "Error") {
        return "error";
      } else if (loadResult.type === "None") {
        // We didn't find any saved state, so we start with a blank tutorial.
        return "loaded";
      }

      const { value } = loadResult;

      // We found some saved state!
      const decoded = decode(config.schema.type, value.state);

      // It's invalid.
      if (decoded.failed) {
        console.warn("tutorial: invalid saved data found");
        // Just treat this like we didn't find any saved state.
        return "loaded";
      }

      // It's valid!
      console.info("tutorial: saved data found");

      // Make sure our local version matches the persisted version.
      lastSavedVersion.current = version.current = value.version;

      setInitial(decoded.value);
      if (setSavedStatusRef.current) {
        setSavedStatusRef.current("saved");
      }

      return "loaded";
    };

    //
    // Effect.
    //

    const setUpInitialTutorialState = async () => {
      // No persistence at all.
      if (mode.type === "InstructorMode") {
        setStatus("loaded");
        return;
      }

      setStatus("loading");
      const loadResult = await loadInitialTutorialState();

      if (abortController.signal.aborted) {
        return;
      }

      const newStatus = handleLoadAndGetStatus(loadResult);
      setStatus(newStatus);
    };
    setUpInitialTutorialState();

    return () => {
      console.info("tutorial: unmounting TutorialStateRoot load effect");
      return abortController.abort("Effect cancelled");
    };
  }, [config, mode, courseId]);

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

  const updateLocalStorage = useCallback(
    (tutorialState: unknown) => {
      const storageConfig = getStorageConfig(config, mode);
      if (storageConfig) {
        const data: PersistedTutorialState = {
          version: version.current,
          state: tutorialState,
        };

        storageConfig.storage.setItem(storageConfig.key, data);

        // HACK: Write unauthenticated state to local storage as well (NOT
        // session storage) so we can restore the state later after sign in
        // brings you to a new tab.
        if (mode.type === "UnauthenticatedMode") {
          jsonLocalStorage.setItem(storageConfig.key, data);
        }
      }
    },
    [config, mode],
  );

  const debouncedUpdateLocalStorage = useMemo(
    () =>
      debounce(updateLocalStorage, 2 * 1000, {
        maxWait: 10 * 1000,
        leading: true,
        trailing: true,
      }),
    [updateLocalStorage],
  );

  const latestTutorialState = useRef<any>();

  const onChange = useCallback(
    (newTutorialState: any, _: Updates<TutorialState>) => {
      version.current++;
      latestTutorialState.current = newTutorialState;
      if (setSavedStatusRef.current) {
        setSavedStatusRef.current("unsaved");
      }
      debouncedUpdateLocalStorage(newTutorialState);
      debouncedSave(newTutorialState);

      if (mode.type === "UnauthenticatedMode") {
        setNeedsUnauthenticatedSavedStatus((prev) => {
          // Continue showing if already doing so.
          if (prev) {
            return true;
          }

          // Show the "Not Saved" message if only if you've actually answered a
          // question, not merely navigated.
          return (
            "pretest" in newTutorialState ||
            "responses" in newTutorialState ||
            "posttest" in newTutorialState ||
            "feedback" in newTutorialState
          );
        });
      }
    },
    [debouncedSave, debouncedUpdateLocalStorage, mode.type],
  );

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (!latestTutorialState.current) {
        // Guess nothing ever changed.
        return;
      }

      // Update local storage immediately.
      debouncedUpdateLocalStorage.cancel();
      updateLocalStorage(latestTutorialState.current);

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
  }, [
    save,
    debouncedSave,
    updateLocalStorage,
    debouncedUpdateLocalStorage,
    mode,
  ]);

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
            key={mode.type === "CourseMode" ? mode.courseId : mode.type}
            overrideRootField={config.schema}
            initial={initial}
            onChange={onChange}
          >
            {routeElement}
          </Root>

          {courseId && <SavedStatus subscribe={savedStatusSubscribe} />}

          {mode.type === "UnauthenticatedMode" &&
            needsUnauthenticatedSavedStatus && <UnauthenticatedSavedStatus />}
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
        <SavedStatusMessage>
          <SyncIcon />
          Saving changes…
        </SavedStatusMessage>
      );
    case "saved":
      return (
        <SavedStatusMessage>
          <CheckCircleIcon />
          Saved changes
        </SavedStatusMessage>
      );
    case "unsaved":
      return (
        <SavedStatusMessage>
          <EllipsisCircleIcon />
          Unsaved changes…
        </SavedStatusMessage>
      );
    case "error":
      return (
        <SavedStatusMessage error>
          <AlertIcon />
          Saving failed
        </SavedStatusMessage>
      );
  }
}

const UnauthenticatedSavedStatus = () => {
  return (
    <SavedStatusMessage error>
      <AlertIcon />
      <button onClick={() => signIn()}>Sign in</button> to save changes
    </SavedStatusMessage>
  );
};

const SavedStatusMessage = ({
  children,
  error,
}: {
  children?: Html;
  error?: boolean;
}) => (
  <div className={cx(styles.savedStatus, error && styles.savedStatusError)}>
    {children}
  </div>
);

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
