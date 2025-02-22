import { useCourse, usePostReports } from "@/api/client";
import { useAuth, UserMenu } from "@/auth/client";
import {
  AuthGuard,
  Breadcrumb,
  Button,
  Callout,
  DropdownControl,
  Header,
  Horizontal,
  LoadingAnimation,
  MainContentBox,
  Page,
  Prose,
  Table,
  TextBoxControl,
  Vertical,
} from "@/components";
import { isValidEmailList } from "@/helpers/client";
import { Course } from "@/schema/api";
import { tutorialList } from "@pages/tutorials/list";
import { DownloadIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CourseReports() {
  const auth = useAuth({ required: true });

  const router = useRouter();
  const { courseId } = router.query as { courseId?: string };

  const { data: course, error } = useCourse(courseId ? { courseId } : null);

  const title = course
    ? `Student Responses for ${course.displayName}`
    : `Student Responses for ${courseId}`;

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
          <Prose>
            <h1>Student Responses</h1>

            {course && (
              <p>
                Course: {course.displayName}
                <br />
                Course ID: <code>{course.id}</code>
              </p>
            )}
          </Prose>

          {course && <StudentResponsesForm course={course} />}

          <Vertical.Space before={300}>
            <Prose>
              <h2>How to Interpret the CSV File</h2>
            </Prose>
          </Vertical.Space>

          <Table>
            <thead className="text-left">
              <tr>
                <td>Column</td>
                <td>Description</td>
              </tr>
            </thead>

            <tbody className="text-left text-small">
              <tr>
                <td>Course ID</td>
                <td>This course’s ID code.</td>
              </tr>

              <tr>
                <td>Tutorial</td>
                <td>The name of the tutorial that the student completed.</td>
              </tr>

              <tr>
                <td>Email</td>
                <td>
                  The student’s email address (or an anonymized version if you
                  didn’t include their email in the list of student emails
                  above).
                </td>
              </tr>

              <tr>
                <td>Time Started</td>
                <td>
                  The date and time the student started working on the tutorial.
                  I.e., the first time any of the student’s interactions with
                  the tutorial were saved.
                </td>
              </tr>

              <tr>
                <td>Last Update</td>
                <td>
                  The last time any interaction with the tutorial was saved.
                  Note: a large gap between “Time Started” and “Last Update”
                  does not necessarily imply that the student worked
                  continuously for this whole time.
                </td>
              </tr>

              <tr>
                <td>Num. Pages</td>
                <td>
                  The total number of pages in this tutorial, not counting the
                  introduction, pretest, or feedback pages.
                </td>
              </tr>

              <tr>
                <td>Num. Pages Completed</td>
                <td>
                  The number of pages this student completed. A page is
                  considered complete if the student worked through all the
                  questions on the page and was allowed to move on to the next
                  page. Because students are allowed to navigate to any page
                  without completing previous pages, this number may
                  underestimate the amount of work the student actually did.
                </td>
              </tr>

              <tr>
                <td>Approx. Response %</td>
                <td>
                  A <strong>very rough</strong> estimation of how many questions
                  the student answered compared to how many they could have
                  possibly answered (given as a percentage).{" "}
                  <strong>You should not expect 100%.</strong> Many tutorials
                  have some questions that students will only see depending on
                  their previous answers, but this percentage is calculated out
                  of all questions. Also, a response is counted if <em>any</em>{" "}
                  answer was provided, regardless of correctness or length.
                </td>
              </tr>

              <tr>
                <td>Pretest: *</td>
                <td>
                  If pretest responses are included, the answers to each pretest
                  question are given in these columns.
                </td>
              </tr>
            </tbody>
          </Table>
        </AuthGuard>
      </MainContentBox>
    </Page>
  );
}

const StudentResponsesForm = ({ course }: { course: Course }) => {
  const { mutate, status, data, error } = usePostReports();

  const [tutorialId, setTutorialId] = useState<string>();
  const [emails, setEmails] = useState("");
  const [includePretests, setIncludePretests] = useState(false);
  const [includeFeedback, setIncludeFeedback] = useState(false);

  const isValid =
    tutorialId !== undefined && !!emails.length && isValidEmailList(emails);
  const canSubmit = isValid && status !== "loading";

  return (
    <form
      onSubmit={(e) => {
        if (!canSubmit) {
          return;
        }
        const options = new Intl.DateTimeFormat().resolvedOptions();

        const now = new Date();
        const date = `${now.getFullYear()}-${
          now.getMonth() + 1
        }-${now.getDate()}`;
        const filename = `acephysics_${
          tutorialId || "ALL_TUTORIALS"
        }_${date}.csv`;

        mutate(
          { courseId: course.id },
          {
            tutorialId,
            unhashedStudentEmails: emails,
            locale: options.locale,
            timeZone: options.timeZone,
            includePretests: includePretests && tutorialId !== "",
            includeFeedback: includeFeedback,
          },
        ).then((result) => {
          if (!result.failed && result.value) {
            download(filename, result.value);
          }
        });
        e.preventDefault();
      }}
    >
      <Vertical>
        <Prose>
          Using this page, you can download a report of your students’
          responses.
        </Prose>

        <DropdownControl
          label="Tutorial"
          choices={[
            ["", "ALL TUTORIALS"],
            ...tutorialList.map((l) => [l.id, l.label] as const),
          ]}
          value={tutorialId}
          onChange={setTutorialId}
          placeholder="Select tutorial…"
        />

        <Horizontal as="label" spacing={50}>
          <div>
            <input
              type="checkbox"
              checked={includePretests && tutorialId !== ""}
              onChange={(e) => setIncludePretests(e.target.checked)}
              disabled={tutorialId === ""}
            />
          </div>

          <Prose faded={tutorialId === ""}>
            Include pre- and posttest responses in report.
          </Prose>
        </Horizontal>

        {tutorialId === "" && (
          <Prose>
            <Prose.SubText>
              You can only download pretest responses for one tutorial at a
              time.
            </Prose.SubText>
          </Prose>
        )}

        <Horizontal as="label" spacing={50}>
          <div>
            <input
              type="checkbox"
              checked={includeFeedback}
              onChange={(e) => setIncludeFeedback(e.target.checked)}
            />
          </div>

          <Prose>Include feedback survey responses in report.</Prose>
        </Horizontal>

        <TextBoxControl
          label={
            <Prose hyphenate={false}>
              <p>Student emails</p>

              <Prose.SubText>One email address per line.</Prose.SubText>
            </Prose>
          }
          value={emails}
          onChange={setEmails}
          minRows={5}
          placeholder="student@example.com"
        />

        <Prose>
          <Prose.SubText>
            We anonymize all email addresses in our database, so you must
            provide a list of student emails every time you download student
            responses. This list allows us to temporarily un-anonymize our data
            so that you can identify students in the CSV file. If your list is
            incomplete, the “Email” column in the CSV file will include entries
            that look like random strings of characters.
          </Prose.SubText>
        </Prose>

        {error && (
          <Callout color="red">
            There was a problem generating the report.
          </Callout>
        )}

        {status === "success" && !data && (
          <Callout color="yellow">No data was found for this tutorial.</Callout>
        )}

        {status === "success" && data && (
          <Callout color="green">Your download has started.</Callout>
        )}

        <Horizontal justify="end">
          {status === "loading" && <LoadingAnimation size="small" message="" />}

          <Button
            color="green"
            type="submit"
            iconRight={<DownloadIcon />}
            disabled={!canSubmit}
          >
            Download CSV
          </Button>
        </Horizontal>
      </Vertical>
    </form>
  );
};

const download = (filename: string, text: string) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(text),
  );
  element.setAttribute("download", filename);
  element.setAttribute("target", "_blank");

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
