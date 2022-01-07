import { useCourses } from "@/api/client";
import { useAuth } from "@/auth/client";
import {
  ApplyContentBox,
  Button,
  Callout,
  Justify,
  LoadingAnimation,
  MainContentBox,
  Prose,
  Vertical,
} from "@/components";
import { Html, JsxElement } from "@/helpers/frontend";
import { TUTORIAL_STATE_NO_COURSE } from "@/schema/db";
import { ArrowRightIcon, LockIcon } from "@primer/octicons-react";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { TutorialConfig } from "../config";
import {
  defaultMode,
  InstructorModeProvider,
  isValidMode,
  Mode,
  ModeManager,
} from "./mode-manager";
import TutorialHeader from "./TutorialHeader";
import { TutorialStateRoot } from "./TutorialStateRoot";

export default function TutorialRoot({
  config,
  routeElement,
}: {
  config: TutorialConfig;
  routeElement: JsxElement;
}) {
  const auth = useAuth();
  const { data: courses, error } = useCourses({
    revalidateOnFocus: false,
  });

  const [mode, setMode] = useState<Mode | undefined>(
    auth.status === "authenticated" && courses
      ? defaultMode(auth.user, courses)
      : undefined
  );

  useEffect(() => {
    if (auth.status !== "authenticated" || !courses) {
      return;
    }
    // Once `courses` is loaded, validate and possibly auto-select a `courseId`.
    setMode((prev) => {
      if (prev && isValidMode(auth.user, courses, prev)) {
        // Then keep what was already set.
        return prev;
      }
      return defaultMode(auth.user, courses);
    });
  }, [auth, courses]);

  const courseId =
    mode?.type === "CourseMode"
      ? mode.courseId
      : mode?.type === "ExplorationMode"
      ? TUTORIAL_STATE_NO_COURSE
      : undefined;

  return (
    <>
      <TutorialHeader config={config} mode={mode} />

      <Vertical as="main" space={300} style={{ counterReset: "section" }}>
        {((): Html => {
          if (auth.status === "unauthenticated") {
            return <SignedOut />;
          }

          if (auth.status === "loading" || (!courses && !error)) {
            return (
              <div style={{ marginTop: "3rem" }}>
                <LoadingAnimation size="large" />
              </div>
            );
          }

          // The `!courses` makes TypeScript happy but is not needed.
          if (error || !courses) {
            return (
              <Vertical.Space after={100}>
                <ApplyContentBox>
                  <Callout as="section" color="red">
                    We couldn't load this tutorial for you.
                  </Callout>
                </ApplyContentBox>
              </Vertical.Space>
            );
          }

          return (
            <>
              <Vertical.Space after={100}>
                <ApplyContentBox>
                  <Callout as="section" color="blue">
                    <ModeManager
                      mode={mode}
                      setMode={setMode}
                      courses={courses}
                      user={auth.user}
                    />
                  </Callout>
                </ApplyContentBox>
              </Vertical.Space>

              {mode && (
                <InstructorModeProvider
                  value={
                    mode.type === "InstructorMode" &&
                    (auth.user.role === "instructor" ||
                      auth.user.role === "admin")
                      ? mode.options
                      : null
                  }
                >
                  <TutorialStateRoot
                    config={config}
                    routeElement={routeElement}
                    courseId={courseId}
                  />
                </InstructorModeProvider>
              )}
            </>
          );
        })()}
      </Vertical>
    </>
  );
}

const SignedOut = () => (
  <MainContentBox as="section" marginTop="large">
    <Justify center>
      <LockIcon size="medium" />
    </Justify>

    <Prose justify="center">You must be signed in to see this page.</Prose>

    <Justify center>
      <Button
        color="green"
        onClick={() => signIn()}
        iconRight={<ArrowRightIcon />}
      >
        Sign in with email
      </Button>
    </Justify>

    <Prose justify="center" size="small" faded>
      If you don’t have an account, one will be created for you.
    </Prose>
  </MainContentBox>
);
