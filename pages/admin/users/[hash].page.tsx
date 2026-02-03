import { useMoveTutorial, useUpdateUser, useUser } from "@/api/client";
import { UserMenu, useAuth, useUnhashedEmail } from "@/auth/client";
import {
  AuthGuard,
  Breadcrumb,
  Button,
  Callout,
  DropdownControl,
  Header,
  Horizontal,
  LabelsLeft,
  LinkButton,
  LinkCard,
  LoadingAnimation,
  MainContentBox,
  Modal,
  Page,
  Prose,
  Vertical,
} from "@/components";
import { TutorialState, User } from "@/schema/api";
import { TUTORIAL_STATE_NO_COURSE } from "@/schema/db";
import { tutorialList } from "@pages/tutorials/list";
import {
  CheckCircleIcon,
  InfoIcon,
  PersonFillIcon,
  PersonIcon,
} from "@primer/octicons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { AccountLookupForm } from "../components";

export default function UserView() {
  // Extract hash from URL.
  const router = useRouter();
  const { hash } = router.query as { hash?: string };

  const auth = useAuth({
    required: true,
  });

  const { data: user, error } = useUser(hash ? { hash } : null);

  return (
    <Page title="Admin">
      <Header title="Admin" popovers={<UserMenu />} />

      <MainContentBox>
        <Breadcrumb
          items={[Breadcrumb.home, { link: "/admin", label: "Admin" }]}
        />

        <Prose>
          <h1>Account Lookup</h1>
        </Prose>

        <AuthGuard
          auth={auth}
          allowed={
            auth.status === "authenticated" && auth.user.role === "admin"
          }
          loading={!user && !error}
        >
          {error && error.type !== "404 NOT FOUND" && (
            <Callout color="red">
              We encountered an error loading this page.
            </Callout>
          )}

          {/* If we get a 404, it's because this user doesn't yet exist */}
          {error && error.type === "404 NOT FOUND" && !!hash && (
            <LoadedUser
              key={hash}
              user={{
                isPersisted: false,
                isEmailVerified: false,
                email: hash,
              }}
            />
          )}

          {user && (
            <LoadedUser
              key={hash}
              user={{
                ...user,
                isPersisted: true,
              }}
            />
          )}
        </AuthGuard>
      </MainContentBox>
    </Page>
  );
}

type PossibleUser =
  | ({ isPersisted: true } & User)
  | ({ isPersisted: false } & Pick<User, "isEmailVerified" | "email">);

const useIsSelf = (user: PossibleUser) => {
  const auth = useAuth();
  return auth.status === "authenticated" && auth.user.email === user.email;
};

function LoadedUser({ user }: { user: PossibleUser }) {
  const isSelf = useIsSelf(user);
  const email = useUnhashedEmail(user.email);

  // If we can't find the email address in local storage, force you to start
  // over, since this might be a nonsense URL.
  if (!user.isPersisted && email === null) {
    return (
      <Callout as="section" color="red">
        <Vertical space={50}>
          <Prose>Please start over by searching for an email address.</Prose>

          <AccountLookupForm />
        </Vertical>
      </Callout>
    );
  }

  return (
    <Vertical>
      <Callout as="section" color="green" autoProse={false}>
        {email === undefined ? (
          <LoadingAnimation size="small" />
        ) : (
          <AccountLookupForm originalEmail={email || user.email || ""} />
        )}
      </Callout>

      {isSelf && (
        <Callout
          as="section"
          color="yellow"
          iconLeft={<InfoIcon size="medium" />}
        >
          This user is you. Hi!
        </Callout>
      )}

      <Callout
        as="section"
        color="neutral"
        iconLeft={
          user.isEmailVerified ? (
            <PersonFillIcon size="medium" />
          ) : (
            <PersonIcon size="medium" />
          )
        }
      >
        {user.isEmailVerified
          ? "User has logged in at least once."
          : "User has never logged in."}
      </Callout>

      <Callout as="section" color="neutral">
        <UserPrivilegesForm user={user} />
      </Callout>

      <Callout as="section" color="neutral">
        <Vertical>
          <h2 className="text-bold">Courses</h2>

          {user.isPersisted ? (
            <UserCourses user={user} />
          ) : (
            <Prose>
              Users will not be associated with any courses until they have
              logged in.
            </Prose>
          )}
        </Vertical>
      </Callout>

      <Callout as="section" color="neutral">
        <Vertical>
          <Vertical.Space after={50}>
            <h2 className="text-bold">Tutorial Submissions</h2>
          </Vertical.Space>

          {user.isPersisted ? (
            <UserTutorials user={user} />
          ) : (
            <Prose>No tutorial submissions.</Prose>
          )}
        </Vertical>
      </Callout>
    </Vertical>
  );
}

function UserPrivilegesForm({ user }: { user: PossibleUser }) {
  const isSelf = useIsSelf(user);

  const mutation = useUpdateUser();

  // If the user exists, their role is "student" regardless of whether that is
  // saved.  This is important so the "Save" button isn't immediately active for
  // every existing student.
  const originalRole = user.isPersisted ? user.role || "student" : undefined;

  const [role, setRole] = useState<"student" | "instructor" | "admin">(
    originalRole || "student",
  );

  const isDirty = role !== originalRole;

  const disabled = isSelf || !isDirty || mutation.status === "loading";

  const submit = async () => {
    if (disabled) {
      return;
    }

    if (!user.email) {
      throw new Error("Expected user to have email address");
    }

    await mutation.mutate(
      {
        hash: user.email,
      },
      {
        role: role,
      },
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      autoComplete="off"
    >
      <Vertical>
        <Horizontal>
          <LabelsLeft style={{ flex: 1 }}>
            <DropdownControl
              label="Privileges:"
              choices={
                [
                  [
                    "student",
                    <>
                      Student <span style={{ opacity: 0.5 }}>(default)</span>
                    </>,
                  ],
                  ["instructor", "Instructor"],
                  ["admin", "Admin"],
                ] as const
              }
              value={role}
              onChange={(p) => setRole(p || "instructor")}
              disabled={isSelf}
            />
          </LabelsLeft>

          <Button
            color="green"
            type="submit"
            disabled={disabled}
            disabledExplanation={
              isSelf ? "You can’t change your own privileges." : undefined
            }
            loading={mutation.status === "loading"}
          >
            Save
          </Button>
        </Horizontal>

        {mutation.status === "success" && !isDirty && (
          <Callout color="green" iconLeft={<CheckCircleIcon size="medium" />}>
            User privileges updated.
          </Callout>
        )}

        {mutation.status === "error" && (
          <Callout color="red">Could not update user privileges.</Callout>
        )}

        <Prose size="ui-small">
          <p>
            <strong>Students</strong> can do tutorials and access their courses.
            All users are students by&nbsp;default.
          </p>

          <p>
            <strong>Instructors</strong> can create courses, and they can do
            tutorials in “instructor mode”, which allows them to see every
            question and guidance element all at once. They can see the answers!
          </p>

          <p>
            <strong>Admins</strong>, like you, also have instructor privileges.
            In addition, admins can grant these privileges.
          </p>
        </Prose>
      </Vertical>
    </form>
  );
}

function UserCourses({ user }: { user: User }) {
  if (!user.courses.length) {
    return <Prose>This user is not associated with any courses.</Prose>;
  }

  return (
    <ul>
      {user.courses.map((course) => (
        <li key={course.id}>
          <LinkCard
            label={course.displayName}
            link={{
              pathname: "/courses/[courseId]",
              query: { courseId: course.id },
            }}
            proseSize="ui-small"
          >
            Role:{" "}
            <strong>
              {course.userRole === "instructor" ? "Instructor" : "Student"}
            </strong>
            <br />
            Created:{" "}
            <strong>{new Date(course.createdAt).toLocaleDateString()}</strong>
            <br />
            Code: <code>{course.id}</code>
          </LinkCard>
        </li>
      ))}
    </ul>
  );
}

function UserTutorials({ user }: { user: User }) {
  const [movingTutorial, setMovingTutorial] = useState<TutorialState | null>(
    null,
  );

  if (!user.tutorials.length) {
    return <Prose>This user hasn't started any tutorials.</Prose>;
  }

  // Group tutorials by courseId for better organization
  const standaloneKey = TUTORIAL_STATE_NO_COURSE;
  const tutorialsByCourse = new Map<string, TutorialState[]>();

  for (const tutorial of user.tutorials) {
    const key =
      tutorial.courseId === standaloneKey ? standaloneKey : tutorial.courseId;
    let tutorials = tutorialsByCourse.get(key);
    if (!tutorials) {
      tutorials = [];
      tutorialsByCourse.set(key, tutorials);
    }
    tutorials.push(tutorial);
  }

  const courseMap = new Map(user.courses.map((c) => [c.id, c]));
  const tutorialMap = new Map(tutorialList.map((t) => [t.id, t]));

  return (
    <>
      {movingTutorial && (
        <MoveTutorialModal
          tutorial={movingTutorial}
          userEmail={user.email!}
          courses={user.courses}
          onClose={() => setMovingTutorial(null)}
        />
      )}

      {tutorialsByCourse.size === 0 && <Prose>No tutorial submissions.</Prose>}

      {Array.from(tutorialsByCourse.entries()).map(([courseKey, tutorials]) => {
        const isStandalone = courseKey === standaloneKey;
        const course = isStandalone ? null : courseMap.get(courseKey);

        return (
          <Vertical key={courseKey} space={50}>
            <h3 className="text-ui-small">
              {isStandalone
                ? "Exploration mode (no course)"
                : course?.displayName || courseKey}
            </h3>

            <Vertical space={50}>
              {tutorials.map((tutorial) => {
                const tutorialInfo = tutorialMap.get(tutorial.tutorialId);
                const label = tutorialInfo?.label || tutorial.tutorialId;

                return (
                  <Callout
                    key={`${tutorial.courseId}-${tutorial.tutorialId}`}
                    color="blue"
                  >
                    <Vertical space={25}>
                      <h2 className="text-ui-small">
                        <b>{label}</b>
                      </h2>

                      <Prose size="ui-small">
                        Started:{" "}
                        <strong>
                          {new Date(tutorial.createdAt).toLocaleDateString()}
                        </strong>
                        <br />
                        Last updated:{" "}
                        <strong>
                          {new Date(tutorial.updatedAt).toLocaleDateString()}
                        </strong>
                        <br />
                        Number of updates: <code>{tutorial.version}</code>
                      </Prose>

                      <Horizontal>
                        <LinkButton
                          // color="blue"
                          // size="small"
                          className="text-blue"
                          onClick={() => setMovingTutorial(tutorial)}
                        >
                          Switch course
                        </LinkButton>
                      </Horizontal>
                    </Vertical>
                  </Callout>
                );
              })}
            </Vertical>
          </Vertical>
        );
      })}
    </>
  );
}

function MoveTutorialModal({
  tutorial,
  userEmail,
  courses,
  onClose,
}: {
  tutorial: TutorialState;
  userEmail: string;
  courses: User["courses"];
  onClose: () => void;
}) {
  const tutorialInfo = tutorialList.find((t) => t.id === tutorial.tutorialId);
  const tutorialLabel = tutorialInfo?.label || tutorial.tutorialId;

  const [destinationCourseId, setDestinationCourseId] = useState<string>(
    tutorial.courseId,
  );

  const mutation = useMoveTutorial();
  const { mutate: invalidateCache } = useSWRConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (destinationCourseId === tutorial.courseId) {
      // No change needed
      onClose();
      return;
    }

    const result = await mutation.mutate(
      {
        hash: userEmail,
      },
      {
        tutorialId: tutorial.tutorialId,
        sourceCourseId: tutorial.courseId,
        destinationCourseId,
      },
    );

    if (!result.failed) {
      // Invalidate the user cache to refetch the updated tutorial list
      await invalidateCache(`/api/users/${userEmail}`);
      onClose();
    }
  };

  const isDirty = destinationCourseId !== tutorial.courseId;
  const isDisabled = !isDirty || mutation.status === "loading";

  return (
    <Modal
      title={
        <>
          Move <em>{tutorialLabel}</em> to a different course
        </>
      }
      actions={
        <Horizontal>
          <Button color="neutral" onClick={onClose}>
            Cancel
          </Button>

          <Button
            color="green"
            onClick={handleSubmit}
            disabled={isDisabled}
            loading={mutation.status === "loading"}
          >
            Move
          </Button>
        </Horizontal>
      }
    >
      <form onSubmit={handleSubmit}>
        <Vertical>
          <DropdownControl
            label="Destination:"
            choices={[
              [
                TUTORIAL_STATE_NO_COURSE,
                "Exploration mode (no course)",
              ] as const,
              ...courses.map(
                (course) => [course.id, course.displayName] as const,
              ),
            ]}
            value={destinationCourseId}
            onChange={(val) => setDestinationCourseId(val || "")}
          />

          {mutation.status === "error" && (
            <Callout color="red">
              Failed to move tutorial. Please try again.
            </Callout>
          )}
        </Vertical>
      </form>
    </Modal>
  );
}
