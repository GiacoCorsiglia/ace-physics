import { useAuth, UserMenu } from "@/auth/client";
import {
  Button,
  Callout,
  Header,
  Horizontal,
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

  const link = auth.status === "authenticated" ? "/courses" : "/tutorials";
  const verb =
    auth.status === "authenticated" && isInstructor(auth.user)
      ? "teach"
      : "learn";

  const message =
    auth.status === "authenticated"
      ? "You’re signed in and ready to go."
      : "You can sign in with your email address.";

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

        <Callout color="green">
          <Vertical>
            <Prose justify="center">
              <strong>Here to {verb} quantum mechanics?</strong>
            </Prose>

            <Horizontal justify="center">
              <Button color="green" link={link} iconRight={<ArrowRightIcon />}>
                Get started
              </Button>
            </Horizontal>

            <Prose justify="center" size="small">
              {message}
            </Prose>
          </Vertical>
        </Callout>

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
