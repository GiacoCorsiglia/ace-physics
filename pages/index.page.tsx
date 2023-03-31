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

export default function Index() {
  const auth = useAuth();
  const courses = useCourses();

  const verb =
    auth.status === "authenticated" && isInstructor(auth.user)
      ? "teach"
      : "learn";

  const message =
    auth.status === "authenticated"
      ? "You’re signed in and ready to go."
      : "You can sign in with your email address.";

  // Notes:
  // courses.data should return the array of courses however it really trips up
  // over if the value is undefined. So i added a check before to account for that error
  // however that seems more like a hack than a solution.

  // Additionally it does not like "isInstructor(auth.user)" since it believes
  // that .user is not a valid method to call even though it works above

  let link =
    courses.data !== undefined
      ? "/#"
      : courses.data?.length >= 2 || isInstructor(auth.user)
      ? "/courses"
      : courses.data?.length === 1
      ? `/courses/${courses.data[0]?.id}`
      : "/tutorials";

  let getStartedButton =
    courses.data !== undefined &&
    (isInstructor(auth.user)
      ? "Let's Teach!"
      : courses.data?.length >= 2
      ? "Jump to courses"
      : courses.data?.length === 1
      ? `Let's learn ${courses.data[0]?.id}!`
      : "Get Started!");

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

        {auth.status === "loading" && courses.isLoading ? (
          <Callout color="yellow">
            <Prose justify="center">
              <strong>Loading User Account</strong>
            </Prose>
            <LoadingAnimation size="large" message="Counting particles..." />
          </Callout>
        ) : (
          <Callout color="green">
            <Vertical>
              <Prose justify="center">
                <strong>Here to {verb} quantum mechanics?</strong>
              </Prose>

              <Horizontal justify="center">
                <Button
                  color="green"
                  link={link}
                  iconRight={<ArrowRightIcon />}
                >
                  {getStartedButton}
                </Button>
              </Horizontal>

              <Prose justify="center" size="small">
                {message}
              </Prose>
            </Vertical>
          </Callout>
        )}

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
