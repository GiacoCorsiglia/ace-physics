import { useCourse } from "@/api/client";
import { useAuth, UserMenu } from "@/auth/client";
import {
  AuthGuard,
  Breadcrumb,
  Button,
  Callout,
  Header,
  Horizontal,
  MainContentBox,
  Page,
  Prose,
  Vertical,
} from "@/components";
import { TutorialList } from "@/tutorial/components/tutorial-list";
import { tutorialList } from "@pages/tutorials/list";
import { GearIcon, StackIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";

export default function Course() {
  const auth = useAuth({ required: true });

  const router = useRouter();
  const { courseId } = router.query as { courseId?: string };

  const { data: course, error } = useCourse(courseId ? { courseId } : null);

  const title = course ? course.displayName : `Course ${courseId}`;

  const visibleTutorialIds = new Set(course?.visibleTutorials);
  const tutorials =
    visibleTutorialIds.size > 0
      ? tutorialList.filter((l) => visibleTutorialIds.has(l.id))
      : tutorialList;

  return (
    <Page title={title}>
      <Header title={title} popovers={<UserMenu />} />

      <MainContentBox>
        <Breadcrumb
          items={[
            { link: "/", label: "Home" },
            { link: "/courses", label: "Your Courses" },
          ]}
        />

        <AuthGuard
          auth={auth}
          allowed={true}
          errors={error}
          loading={!course && !error}
        >
          {error && (
            <Callout color="red">
              {error.type === "404 NOT FOUND"
                ? "Course not found."
                : "We couldn’t load this course."}
            </Callout>
          )}

          {course && (
            <>
              <Prose>
                <h1>{course.displayName}</h1>

                <p className="text-small text-faded">
                  Course code: <code>{course.id}</code>
                </p>
              </Prose>

              {course.userRole === "instructor" && (
                <Vertical.Space after={200}>
                  <Callout color="neutral" title="You’re an instructor">
                    <Vertical>
                      <Prose size="small" faded>
                        The rest of the page shows what your students see, but
                        you can also:
                      </Prose>

                      <Horizontal>
                        <Button
                          color="blue"
                          link={{
                            pathname: "/courses/[courseId]/edit",
                            query: { courseId },
                          }}
                          iconLeft={<GearIcon />}
                        >
                          Set up this course
                        </Button>

                        <Button
                          color="green"
                          link={{
                            pathname: "/courses/[courseId]/reports",
                            query: { courseId },
                          }}
                          iconLeft={<StackIcon />}
                        >
                          Access student work
                        </Button>
                      </Horizontal>
                    </Vertical>
                  </Callout>
                </Vertical.Space>
              )}

              {course.displayMessage && (
                <>
                  <hr />
                  <Prose style={{ whiteSpace: "pre-line" }}>
                    {course.displayMessage}
                  </Prose>
                  <hr />
                </>
              )}

              <TutorialList tutorials={tutorials} />
            </>
          )}
        </AuthGuard>
      </MainContentBox>
    </Page>
  );
}
