import { ResponseError, useCourses, useCreateCourse } from "@/api/client";
import { useAuth, UserMenu } from "@/auth/client";
import {
  AuthGuard,
  Breadcrumb,
  Button,
  Callout,
  Header,
  Horizontal,
  Justify,
  LinkButton,
  LinkCard,
  LoadingAnimation,
  MainContentBox,
  Page,
  Prose,
  TextInputControl,
  Vertical,
} from "@/components";
import { isInstructor } from "@/helpers/server";
import { Course } from "@/schema/api";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@primer/octicons-react";
import { useState } from "react";

export default function Courses() {
  const auth = useAuth({
    required: true,
  });

  const { data: courses, error, isLoading } = useCourses();

  return (
    <Page title="Courses">
      <Header title="Your Courses" popovers={<UserMenu />} />

      <MainContentBox>
        <Breadcrumb
          items={[
            {
              link: "/",
              label: (
                <>
                  <ArrowLeftIcon /> Home
                </>
              ),
            },
          ]}
        />

        <AuthGuard auth={auth} allowed={true} loading={!courses && !error}>
          <Prose>
            <h1>Your Courses</h1>
          </Prose>

          {auth.status === "authenticated" && courses && (
            <>
              {!!courses.length && (
                <>
                  <ul>
                    {courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </ul>

                  <p>
                    <LinkButton link="/tutorials">
                      View all tutorials
                    </LinkButton>
                  </p>
                </>
              )}

              {!courses.length && (
                <>
                  <Prose>
                    <p>Your account isn’t associated with any courses.</p>

                    <p>
                      <strong>If you’re a student</strong> expecting to receive
                      class credit for using this website, make sure you logged
                      in using the correct email address.
                    </p>

                    <p>
                      <strong>Otherwise</strong>, you can use our tutorials in
                      exploration mode:
                    </p>
                  </Prose>

                  <Justify center>
                    <Button
                      color="green"
                      link="/tutorials"
                      iconRight={<ArrowRightIcon />}
                    >
                      Take me to the tutorials
                    </Button>
                  </Justify>
                </>
              )}

              {isLoading && <LoadingAnimation size="small" />}

              {isInstructor(auth.user) && <CreateCourseForm />}
            </>
          )}
        </AuthGuard>
      </MainContentBox>
    </Page>
  );
}

const CourseCard = ({ course }: { course: Course }) => (
  <li>
    <LinkCard
      label={course.displayName}
      link={{
        pathname: "/courses/[courseId]",
        query: { courseId: course.id },
      }}
    >
      Course code: <code>{course.id}</code>
    </LinkCard>
  </li>
);

const CreateCourseForm = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const mutation = useCreateCourse();

  return (
    <>
      <hr />

      <Prose>
        <strong>You’re an instructor</strong>, so you can create a new course.
      </Prose>

      {!isCreating && (
        <Justify center>
          <Button
            color="blue"
            iconLeft={<PlusIcon />}
            onClick={() => setIsCreating(true)}
          >
            Create a course
          </Button>
        </Justify>
      )}

      {isCreating && (
        <Callout color="neutral" title="Create a new course" animateIn>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              mutation.mutate({ displayName }).then((result) => {
                if (result.failed) {
                  // Keep the form open if it failed.
                  return;
                }
                setDisplayName("");
                setIsCreating(false);
                mutation.reset();
              });
            }}
          >
            <Vertical>
              <TextInputControl
                label={
                  <Prose>
                    <p>Course name</p>

                    <Prose.SubText>
                      Keep it anonymous: don’t include school name or course
                      number.
                    </Prose.SubText>
                  </Prose>
                }
                value={displayName}
                onChange={setDisplayName}
                placeholder="Spring 2019 Quantum Mechanics"
              />

              <Horizontal justify="space-between">
                <Button
                  color="yellow"
                  onClick={() => setIsCreating(false)}
                  disabled={mutation.status === "loading"}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  color="green"
                  iconRight={<ArrowRightIcon />}
                  disabled={
                    displayName.trim() === "" || mutation.status === "loading"
                  }
                >
                  Create course
                </Button>
              </Horizontal>

              {mutation.status === "error" && (
                <ErrorMessage error={mutation.error} />
              )}
            </Vertical>
          </form>
        </Callout>
      )}
    </>
  );
};

const ErrorMessage = ({ error }: { error: ResponseError | undefined }) => {
  const message =
    error?.type === "500 SERVER ERROR" ? error.body?.message : null;

  return (
    <Callout color="red">
      {message || "Sorry, that didn’t seem to work."}
    </Callout>
  );
};
