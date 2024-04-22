import { AuthUser } from "@/auth/client";
import {
  Button,
  ControlGroup,
  DropdownControl,
  Horizontal,
  LinkButton,
  Prose,
  ToggleControl,
  Vertical,
} from "@/components";
import { Html, isInstructor, useBoolean } from "@/helpers/client";
import { Course } from "@/schema/api";
import { createContext, useContext, useEffect, useState } from "react";

export type Mode =
  | { type: "InstructorMode"; options: InstructorModeOptions }
  | { type: "ExplorationMode" }
  | { type: "CourseMode"; courseId: string };

const isCompleteMode = (mode: Partial<Mode> | undefined): mode is Mode =>
  !!mode &&
  (mode.type === "ExplorationMode" ||
    (mode.type === "InstructorMode" && !!mode.options) ||
    (mode.type === "CourseMode" && !!mode.courseId));

type ModeType = Mode["type"];

interface InstructorModeOptions {
  showAllSections?: boolean;
}

const InstructorMode = createContext<InstructorModeOptions | null>(null);
export const InstructorModeProvider = InstructorMode.Provider;
export const useInstructorMode = () => useContext(InstructorMode);

/**
 * Determines if the mode is valid for the user and set of courses.
 */
export const isValidMode = (
  user: AuthUser,
  courses: readonly Course[],
  mode: Mode,
): boolean => {
  if (mode.type === "InstructorMode") {
    // Only these users are allowed to use instructor mode.
    return isInstructor(user);
  }
  if (mode.type === "CourseMode") {
    // Check to see if it's a course the user has access to.
    return courses.some((course) => course.id === mode.courseId);
  }
  return true;
};

/**
 * Determines a good choice of default mode for the user with the given courses,
 * if possible.
 */
export const defaultMode = (
  user: AuthUser,
  courses: readonly Course[],
): Mode | undefined => {
  if (isInstructor(user)) {
    // If it's an instructor, they probably want instructor mode by default.
    return { type: "InstructorMode", options: { showAllSections: true } };
  } else if (courses.length === 0) {
    // If the user has no courses, they have to be in exploration mode.
    return { type: "ExplorationMode" };
  } else if (courses.length === 1) {
    // If the user has just one course, choose that one.
    return { type: "CourseMode", courseId: courses[0].id };
  }

  return undefined;
};

interface Props {
  mode: Mode | undefined;
  setMode: (mode: Mode) => void;
  courses: readonly Course[];
  user: AuthUser;
}

export const ModeManager = (props: Props) => {
  const [isEditing, startEditing, stopEditing] = useBoolean(
    // Immediately start editing if no mode is set.
    props.mode === undefined,
  );

  // Reset editing state when the mode changes from above (such as what happens
  // when it loads initially).
  useEffect(() => {
    if (props.mode === undefined) {
      startEditing();
    } else {
      stopEditing();
    }
  }, [props.mode, startEditing, stopEditing]);

  return isEditing ? (
    <ModeEditor {...props} stopEditing={stopEditing} />
  ) : (
    <ModeDisplay {...props} startEditing={startEditing} />
  );
};

const ModeDisplay = ({
  mode,
  setMode,
  courses,
  user,
  startEditing,
}: Props & { startEditing: () => void }) => {
  const hasCourses = !!courses.length;
  const hasOptions = hasCourses || isInstructor(user);

  const changeButton = (
    <LinkButton onClick={() => startEditing()}>Change</LinkButton>
  );

  const children = (() => {
    switch (mode?.type) {
      case "ExplorationMode":
        return (
          <Prose>
            You’re in <strong>Exploration Mode</strong>. Your work will{" "}
            <strong>not</strong> count for class credit.
          </Prose>
        );

      case "CourseMode":
        const currentCourse = courses.find(
          (course) => course.id === mode.courseId,
        );
        return (
          <Prose>
            Current course: <strong>{currentCourse?.displayName}</strong>.
          </Prose>
        );

      case "InstructorMode":
        return (
          <div>
            <Prose>
              You’re in <strong>Instructor Mode</strong>. Your responses will{" "}
              <strong>not</strong> be saved.
            </Prose>

            <Horizontal as="label" spacing={50}>
              <div>
                <input
                  type="checkbox"
                  checked={!!mode.options.showAllSections}
                  onChange={(e) =>
                    setMode({
                      type: "InstructorMode",
                      options: { showAllSections: e.target.checked },
                    })
                  }
                />
              </div>

              <Prose size="small">
                Show all sections and guidance messages.
              </Prose>
            </Horizontal>
          </div>
        );
      case undefined:
        return <></>;
    }
  })();

  return (
    <Horizontal justify="space-between">
      {children}
      {(hasOptions || !mode) && changeButton}
    </Horizontal>
  );
};

const ModeEditor = ({
  mode,
  setMode,
  courses,
  user,
  stopEditing,
}: Props & { stopEditing: () => void }) => {
  const [newMode, setNewMode] = useState<Partial<Mode> | undefined>(mode);

  const hasCourses = !!courses.length;

  const typeChoices: [ModeType, Html][] = [];
  if (hasCourses) {
    typeChoices.push(["CourseMode", "For Course Credit"]);
  }
  typeChoices.push(["ExplorationMode", "Personal Exploration"]);
  if (isInstructor(user)) {
    typeChoices.push(["InstructorMode", "Instructor Mode"]);
  }

  return (
    <Vertical>
      <ToggleControl
        label="How would you like to work on this tutorial?"
        choices={typeChoices}
        value={newMode?.type}
        onChange={(reducer) =>
          setNewMode((prev) => {
            const selectedType = reducer(prev?.type);
            switch (selectedType) {
              case "ExplorationMode":
                return { type: "ExplorationMode" };
              case "InstructorMode":
                return { type: "InstructorMode", options: {} };
              case "CourseMode":
                const courseId =
                  courses.length === 1
                    ? courses[0].id
                    : prev?.type === "CourseMode"
                      ? prev.courseId
                      : undefined;
                return { type: "CourseMode", courseId };
              case undefined:
                return undefined;
            }
          })
        }
      />

      {newMode?.type === "CourseMode" && (
        <ControlGroup stretch>
          <DropdownControl
            label="Course:"
            choices={courses.map((course) => [course.id, course.displayName])}
            value={newMode.courseId}
            onChange={(courseId) =>
              setNewMode({ type: "CourseMode", courseId })
            }
            placeholder="Select course…"
            disabled={!!newMode.courseId && courses.length === 1}
          />
        </ControlGroup>
      )}

      <Horizontal justify="end">
        {!!mode && (
          <LinkButton onClick={() => stopEditing()}>Cancel</LinkButton>
        )}

        <Button
          color="blue"
          onClick={() => {
            if (isCompleteMode(newMode)) {
              setMode(newMode);
              stopEditing();
            }
          }}
          disabled={!isCompleteMode(newMode)}
          size="small"
        >
          Change
        </Button>
      </Horizontal>
    </Vertical>
  );
};
