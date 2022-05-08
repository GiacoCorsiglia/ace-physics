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
import { ArrowRightIcon } from "@primer/octicons-react";
import Head from "next/head";

export default function Index() {
  const auth = useAuth();

  const link = auth.status === "authenticated" ? "/courses" : "/tutorials";
  const verb =
    auth.status === "authenticated" &&
    (auth.user.role === "instructor" || auth.user.role === "admin")
      ? "teach"
      : "learn";

  return (
    <Page>
      <Head>
        <title>
          ACEPhysics.net - Interactive Online Activities for Physics Learners
        </title>
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
              You can sign in with your email address.
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
