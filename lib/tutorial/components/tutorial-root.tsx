import { useCourses } from "@/api/client";
import { AuthUser, useAuth } from "@/auth/client";
import {
  ApplyContentBox,
  Button,
  Callout,
  Horizontal,
  LoadingAnimation,
  Prose,
  Vertical,
} from "@/components";
import { Html, htmlTitle, JsxElement } from "@/helpers/client";
import { Course } from "@/schema/api";
import { AlertIcon, ArrowRightIcon } from "@primer/octicons-react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useMemo, useState } from "react";
import { TutorialConfig } from "../config";
import {
  AuthenticatedMode,
  defaultMode,
  InstructorModeProvider,
  isValidMode,
  Mode,
  ModeManager,
  UnauthenticatedMode,
} from "./mode-manager";
import { TutorialHeader } from "./tutorial-header";
import { TutorialStateRoot } from "./tutorial-state-root";

type TutorialRootState =
  | { readonly status: "loading" }
  | { readonly status: "error" }
  | {
      readonly status: "unauthenticated";
      readonly mode: UnauthenticatedMode;
    }
  | {
      readonly status: "authenticated";
      readonly user: AuthUser;
      readonly courses: readonly Course[];
      readonly mode: AuthenticatedMode | undefined;
      readonly setMode: (mode: AuthenticatedMode) => void;
    };

const useTutorialRootState = (): TutorialRootState => {
  const auth = useAuth();
  const courses = useCourses({
    revalidateOnFocus: false,

    isPaused() {
      // Don't (re)fetch if we already know you're unauthenticated.
      return auth.status === "unauthenticated";
    },

    shouldRetryOnError(err) {
      // Don't bother retrying if we got a 403 and we know you're not logged in.
      if (auth.status === "unauthenticated" && err.type === "403 FORBIDDEN") {
        return false;
      }

      return true;
    },
  });

  const [mode, setMode] = useState<Mode | undefined>();

  // If you're unauthenticated, you don't have any courses, we don't care about
  // the state of `useCourses`.  Note this check must come first.
  return useMemo((): TutorialRootState => {
    if (auth.status === "unauthenticated") {
      // Enforce that you're in unauthenticated mode (but maintain references).
      const unauthenticatedMode: UnauthenticatedMode =
        mode?.type === "UnauthenticatedMode"
          ? mode
          : { type: "UnauthenticatedMode" };
      if (mode !== unauthenticatedMode) {
        setMode(unauthenticatedMode);
      }

      return {
        status: "unauthenticated",
        mode: unauthenticatedMode,
      };
    }

    if (auth.status === "loading" || (!courses.data && !courses.error)) {
      return {
        status: "loading",
      };
    }

    // We only care about the error state of `useCourses` when you're actually
    // authenticated.  It might be a 403 when `useAuth` is still loading but you
    // are in fact unauthenticated.
    if (auth.status === "authenticated" && courses.error) {
      return {
        status: "error",
      };
    }

    // OK, we're logged in and loaded.

    // At this point, `courses.data` must exist, but TypeScript doesn't know.
    const coursesData = courses.data!;

    // Figure out what mode we're actually in.
    const effectiveMode = ((): AuthenticatedMode | undefined => {
      // Always preserve the existing mode if it's still valid.
      if (
        mode &&
        mode.type !== "UnauthenticatedMode" &&
        isValidMode(auth.user, coursesData, mode)
      ) {
        return mode;
      }

      return defaultMode(auth.user, coursesData);
    })();
    // Ensure state is in sync with effective mode if necessary.
    if (mode !== effectiveMode) {
      setMode(effectiveMode);
    }

    return {
      status: "authenticated" as const,
      user: auth.user,
      courses: coursesData,
      mode: effectiveMode,
      setMode,
    };
  }, [auth, courses.data, courses.error, mode]);
};

export const TutorialRoot = ({
  config,
  routeElement,
}: {
  config: TutorialConfig;
  routeElement: JsxElement;
}) => {
  const state = useTutorialRootState();

  return (
    <>
      <TutorialHeader
        config={config}
        mode={state.status === "authenticated" ? state.mode : undefined}
      />

      <Vertical as="main" space={300} style={{ counterReset: "section" }}>
        {((): Html => {
          if (state.status === "loading") {
            return (
              <>
                <Head>
                  <title>
                    {htmlTitle(
                      typeof config.label === "string"
                        ? config.label
                        : config.label.title,
                    )}
                  </title>
                </Head>

                <div style={{ marginTop: "3rem" }}>
                  <LoadingAnimation size="large" />
                </div>
              </>
            );
          }

          if (state.status === "error") {
            return (
              <>
                <Head>
                  <title>{htmlTitle("Error")}</title>
                </Head>

                <Vertical.Space after={100}>
                  <ApplyContentBox>
                    <Callout as="section" color="red">
                      We couldn't load this tutorial for you.
                    </Callout>
                  </ApplyContentBox>
                </Vertical.Space>
              </>
            );
          }

          return (
            <>
              <TutorialModeManager state={state} />

              {/* We won't have a mode at first if the user has multiple courses. */}
              {state.mode && (
                <InstructorModeProvider
                  value={
                    state.mode.type === "InstructorMode"
                      ? state.mode.options
                      : null
                  }
                >
                  <TutorialStateRoot
                    config={config}
                    routeElement={routeElement}
                    mode={state.mode}
                  />
                </InstructorModeProvider>
              )}
            </>
          );
        })()}
      </Vertical>
    </>
  );
};

const TutorialModeManager = ({ state }: { state: TutorialRootState }) => {
  if (state.status === "loading" || state.status === "error") {
    return null;
  }

  return (
    <Vertical.Space after={100}>
      <ApplyContentBox>
        <Callout
          as="section"
          color={state.status === "unauthenticated" ? "red" : "blue"}
          iconLeft={
            state.status === "unauthenticated" ? (
              <AlertIcon size={"medium"} />
            ) : undefined
          }
        >
          {state.status === "unauthenticated" && (
            <Horizontal justify="space-between">
              <Prose>
                You’re not signed in.{" "}
                <strong>Your work will not be saved.</strong>
              </Prose>

              <Button
                onClick={() => signIn()}
                color="red"
                size="small"
                iconRight={<ArrowRightIcon />}
              >
                Sign in
              </Button>
            </Horizontal>
          )}

          {state.status === "authenticated" && (
            <ModeManager
              mode={state.mode}
              setMode={state.setMode}
              courses={state.courses}
              user={state.user}
            />
          )}
        </Callout>
      </ApplyContentBox>
    </Vertical.Space>
  );
};
