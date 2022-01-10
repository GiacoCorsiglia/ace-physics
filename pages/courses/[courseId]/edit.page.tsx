import { useCourse, useUpdateCourse, useUpdateCourseUsers } from "@/api/client";
import { useAuth, UserMenu } from "@/auth/client";
import {
  AuthGuard,
  Button,
  Callout,
  ChooseControl,
  Header,
  Horizontal,
  LoadingAnimation,
  MainContentBox,
  Page,
  Prose,
  TextBoxControl,
  TextInputControl,
  Vertical,
} from "@/components";
import { Breadcrumb } from "@/components/breadcrumb";
import { arraysEqual, isValidEmailList } from "@/helpers/function-helpers";
import { Course } from "@/schema/api";
import { tutorialList } from "@pages/tutorials/list";
import { CheckCircleIcon, UploadIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditCourse() {
  const auth = useAuth({ required: true });

  const router = useRouter();
  const { courseId } = router.query as { courseId: string };

  const { data: course, error } = useCourse({ courseId });

  const title = course
    ? `Editing ${course.displayName}`
    : `Editing Course ${courseId}`;

  return (
    <Page title={title}>
      <Header title={title} popovers={<UserMenu />} />

      <MainContentBox>
        <Breadcrumb
          items={[
            { link: "/", label: "Home" },
            { link: "/courses", label: "Your Courses" },
            course && {
              link: { pathname: "/courses/[courseId]", query: { courseId } },
              label: course.displayName,
            },
          ]}
        />

        <AuthGuard
          auth={auth}
          errors={error}
          allowed={!!course && course.userRole === "instructor"}
          loading={!error && !course}
        >
          {error && (
            <Callout color="red">We couldn’t load this course.</Callout>
          )}

          {course && (
            <>
              <Prose>
                <h1>{course.displayName}</h1>
              </Prose>

              <hr />

              <CourseForm course={course} />

              <hr />

              <CourseUsersForm course={course} />
            </>
          )}
        </AuthGuard>
      </MainContentBox>
    </Page>
  );
}

const CourseForm = ({ course }: { course: Course }) => {
  const mutation = useUpdateCourse();

  const [displayName, setDisplayName] = useState(course.displayName);
  const [displayMessage, setDisplayMessage] = useState(course.displayMessage);
  const [visibleTutorials, setVisibleTutorials] = useState(
    course.visibleTutorials
  );

  const isDirty =
    course.displayName !== displayName ||
    (course.displayMessage || "") !== (displayMessage || "") ||
    !arraysEqual(course.visibleTutorials, visibleTutorials);

  useEffect(() => {
    if (isDirty) {
      // This makes the linter understand I don't use classes.
      const reset = mutation.reset;
      reset();
    }
  }, [isDirty, mutation.reset]);

  const submit = async () => {
    const result = await mutation.mutate(
      { courseId: course.id },
      {
        displayName,
        displayMessage,
        visibleTutorials,
      }
    );

    if (result.failed) {
      return;
    }

    setDisplayName(result.value.displayName);
    setDisplayMessage(result.value.displayMessage);
    setVisibleTutorials(result.value.visibleTutorials);
  };

  return (
    <>
      <Prose>
        <h2>Course Settings</h2>
      </Prose>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Vertical>
          <TextInputControl
            label={
              <Prose>
                <p>Course name</p>

                <Prose.SubText>
                  Keep it anonymous: don’t include school name or course number.
                </Prose.SubText>
              </Prose>
            }
            value={displayName}
            onChange={setDisplayName}
            disabled={mutation.status === "loading"}
          />

          <TextBoxControl
            label={
              <Prose>
                <p>Message to students</p>

                <Prose.SubText>
                  This message will be displayed above the list of tutorials on
                  the course’s home page.
                </Prose.SubText>
              </Prose>
            }
            value={displayMessage}
            onChange={setDisplayMessage}
            placeholder="Type here"
            disabled={mutation.status === "loading"}
          />

          <ChooseControl
            label={
              <Prose>
                <p>Listed tutorials</p>

                <Prose.SubText>
                  If no tutorials are selected, all of them will be listed. Note
                  that the system will not stop students from attempting any
                  tutorial.
                </Prose.SubText>
              </Prose>
            }
            multi={true}
            choices={tutorialList.map(
              (listing) => [listing.id, listing.label] as const
            )}
            value={visibleTutorials}
            onChange={(reducer) =>
              setVisibleTutorials((prev) => {
                const selected = new Set(reducer(prev));
                // Since we don't support custom sorting right now, make sure
                // the order is forced to match the display order.
                return tutorialList
                  .map((l) => l.id)
                  .filter((id) => selected.has(id));
              })
            }
            disabled={mutation.status === "loading"}
          />

          {mutation.status === "success" && (
            <Callout color="green" animateIn iconRight={<CheckCircleIcon />}>
              Your changes were saved.
            </Callout>
          )}

          {mutation.status === "error" && (
            <Callout color="red" animateIn>
              Your changes could not be saved.
            </Callout>
          )}

          <Horizontal justify="end">
            {mutation.status === "loading" && (
              <LoadingAnimation size="small" message={null} />
            )}

            <Button
              color="green"
              type="submit"
              iconRight={<UploadIcon />}
              disabled={
                !isDirty || !displayName || mutation.status === "loading"
              }
            >
              Save new settings
            </Button>
          </Horizontal>
        </Vertical>
      </form>
    </>
  );
};

const CourseUsersForm = ({ course }: { course: Course }) => {
  const mutation = useUpdateCourseUsers();

  const [studentEmails, setStudentEmails] = useState("");
  const [wantsInstructors, setWantsInstructors] = useState(false);
  const [instructorEmails, setInstructorEmails] = useState("");

  const isEmpty = !studentEmails && (!wantsInstructors || !instructorEmails);
  const isValid =
    isValidEmailList(studentEmails) &&
    (!wantsInstructors || isValidEmailList(instructorEmails));

  const isDisabled = mutation.status === "loading" || isEmpty || !isValid;

  const resetMutation = (oldEmails: string, newEmails: string) => {
    if (
      (mutation.status === "success" || mutation.status === "error") &&
      oldEmails === "" &&
      newEmails
    ) {
      mutation.reset();
    }
  };

  const submit = async () => {
    if (isDisabled) {
      return;
    }

    const result = await mutation.mutate(
      { courseId: course.id },
      {
        unhashedStudentEmails: studentEmails || "",
        unhashedInstructorEmails: wantsInstructors
          ? instructorEmails || ""
          : "",
      }
    );

    if (!result.failed) {
      setStudentEmails("");
      setInstructorEmails("");
      setWantsInstructors(false);
    }
  };

  const data = mutation.data;
  const actions = (
    <>
      {mutation.status === "success" && (
        <Callout color="green" animateIn>
          {!!data!.newStudents.length && (
            <p>
              Added <strong>{data!.newStudents.length}</strong> student
              {data!.newStudents.length > 1 && "s"}.
            </p>
          )}

          {!!data!.newInstructors.length && (
            <p>
              Added <strong>{data!.newInstructors.length}</strong> instructor
              {data!.newInstructors.length > 1 && "s"}.
            </p>
          )}

          {!data!.newInstructors.length && !data!.newStudents.length && (
            <p>No new students or instructors added.</p>
          )}

          {!!data!.unhashedRejectedEmails.length && (
            <Callout color="red">
              The following emails were rejected:{" "}
              <ul>
                {data!.unhashedRejectedEmails.map((email, i) => (
                  <li key={i + email}>{email}</li>
                ))}
              </ul>
            </Callout>
          )}
        </Callout>
      )}

      {mutation.status === "error" && (
        <Callout color="red" animateIn>
          Your changes could not be saved.
        </Callout>
      )}

      <Horizontal justify="end">
        {mutation.status === "loading" && (
          <LoadingAnimation size="small" message={null} />
        )}

        <Button
          color="green"
          type="submit"
          iconRight={<UploadIcon />}
          disabled={isDisabled}
          disabledExplanation={
            !isValid ? "Please enter one valid email address per line." : ""
          }
        >
          Add students {wantsInstructors && "and instructors"}
        </Button>
      </Horizontal>
    </>
  );

  return (
    <>
      <Prose>
        <h2>Add Students and Instructors</h2>

        <p>
          Your students cannot access this course unless they sign in to ACE
          Physics using the email address you add for them here.
        </p>
      </Prose>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Vertical>
          <Vertical.Space after={0}>
            <Prose>
              <strong>Students</strong>
            </Prose>
          </Vertical.Space>

          <TextBoxControl
            label={
              <Prose>
                <p>Student emails</p>

                <Prose.SubText>One email address per line</Prose.SubText>
              </Prose>
            }
            value={studentEmails}
            onChange={(newEmails) => {
              resetMutation(studentEmails, newEmails);
              setStudentEmails(newEmails);
            }}
            minRows={5}
            placeholder="student1@example.com"
            disabled={mutation.status === "loading"}
          />

          <Prose size="small" faded>
            You can copy-paste a column from Excel. Adding the same email
            address twice will have no effect, and any email addresses you added
            previously will be preserved.
          </Prose>

          {!wantsInstructors &&
            (!data || !data.newInstructors.length) &&
            actions}

          <Vertical.Space after={0}>
            <Prose>
              <strong>Instructors</strong>
            </Prose>
          </Vertical.Space>

          <Horizontal as="label" spacing={50}>
            <div>
              <input
                type="checkbox"
                checked={wantsInstructors}
                onChange={(e) => {
                  mutation.reset();
                  setWantsInstructors(e.target.checked);
                }}
                disabled={mutation.status === "loading"}
              />
            </div>

            <Prose>Add instructors to this course.</Prose>
          </Horizontal>

          <Vertical.Space before={0}>
            <Prose size="small" faded>
              Check the box if you want to grant another person administrative
              access to this course. Anyone you add as an instructor will be
              able to edit the course by accessing this page, and will also be
              able to access student work.
            </Prose>
          </Vertical.Space>

          {wantsInstructors && (
            <>
              <TextBoxControl
                label={
                  <Prose>
                    <p>Instructor emails</p>

                    <Prose.SubText>One email address per line.</Prose.SubText>
                  </Prose>
                }
                value={instructorEmails}
                onChange={(newEmails) => {
                  resetMutation(instructorEmails, newEmails);
                  setInstructorEmails(newEmails);
                }}
                placeholder="instructor@example.com"
                disabled={mutation.status === "loading"}
              />
            </>
          )}

          {(wantsInstructors || (data && !!data.newInstructors.length)) &&
            actions}
        </Vertical>
      </form>
    </>
  );
};
