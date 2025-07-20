import { useCourses } from "@/api/client/endpoints";
import { useAuth, UserMenu } from "@/auth/client";
import {
  Button,
  Callout,
  Header,
  Horizontal,
  LoadingAnimation,
  MainContentBox,
  Page,
  Prose,
  Vertical,
} from "@/components";
import { isInstructor } from "@/helpers/server";
import { ArrowRightIcon } from "@primer/octicons-react";
import Head from "next/head";
import { useEffect, useState } from "react";

function UserValidation({ loadingMessage }: { loadingMessage: string }) {
  const auth = useAuth();
  const courses = useCourses();

  if (auth.status === "loading" && courses.isLoading) {
    return (
      <Callout color="yellow">
        <Prose justify="center">
          <strong>Loading User Account</strong>
        </Prose>
        <LoadingAnimation size="large" message={loadingMessage} />
      </Callout>
    );
  } else if (auth.status === "authenticated" && courses.data) {
    // check if instructor
    let verb = "";
    let link = "";
    let buttonText = "";

    if (isInstructor(auth.user)) {
      verb = "teach";
      link = "/courses";
      buttonText = "Let's Teach!";
    } else {
      // Is a student
      verb = "learn";
      if (courses.data?.length > 2) {
        link = "/courses";
        buttonText = "Jump to courses";
      } else if (courses.data?.length === 1) {
        link = `/courses/${courses.data[0]?.id}`;
        buttonText = `Let's learn ${courses.data[0]?.id}!`;
      } else {
        // will have 0 courses
        link = "/tutorials";
        buttonText = "Get Started!";
      }
    }

    return (
      <Callout color="green">
        <Vertical>
          <Prose justify="center">
            <strong>Here to {verb} quantum mechanics?</strong>
          </Prose>
          <Horizontal justify="center">
            <Button color="green" link={link} iconRight={<ArrowRightIcon />}>
              {buttonText}
            </Button>
          </Horizontal>
          <Prose justify="center" size="small">
            You’re signed in and ready to go.
          </Prose>
        </Vertical>
      </Callout>
    );
  } else if (courses.error) {
    return (
      <Callout color="red">
        <Prose justify="center" size="large">
          <b>Something went wrong...</b>
        </Prose>
        <Prose justify="center" size="small">
          Error: {courses.error.type}
        </Prose>
      </Callout>
    );
  }

  return null;
}

const loadingMessages: readonly string[] = [
  "Counting particles...",
  "Questioning physics...",
  "Untangling...",
];

export default function Index() {
  // Using this unfortunate approach so that the initial rendered version is the
  // same on both the server and the client.
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    setMessage(
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
    );
  }, []);

  return (
    <Page>
      <Head>
        <title>
          ACE Physics - Interactive Online Activities for Physics Learners
        </title>

        <meta
          name="description"
          content="Interactive tutorials about quantum mechanics and quantum information science.  The tutorials are free, can be used in or outside the classroom,and are primarily designed for middle- and upper-division undergraduates."
        />
      </Head>

      <Header title="ACE Physics" popovers={<UserMenu />} />

      <MainContentBox vertical={200}>
        <Prose justify="center">
          <h1>Interactive Online Activities for Physics Learners</h1>
        </Prose>

        <UserValidation loadingMessage={message} />

        <Prose justify="center">
          ACE Physics is <strong>free</strong> for all to use. We hope you find
          it useful!
        </Prose>

        <Callout color="blue">
          <Vertical>
            <Prose justify="center">
              <strong>Considering ACE Physics for your classroom?</strong>
            </Prose>

            <Horizontal justify="center">
              <Button color="blue" link="/demo" iconRight={<ArrowRightIcon />}>
                Instructor demo
              </Button>
            </Horizontal>

            <Prose justify="center" size="small">
              <p>No sign in required.</p>
            </Prose>
          </Vertical>
        </Callout>
      </MainContentBox>
    </Page>
  );
}
