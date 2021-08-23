import { UserMenu } from "@/auth";
import { Button, Content, Header, Horizontal, Page, Prose } from "@/components";
import * as urls from "@/urls";
import { ArrowRightIcon } from "@primer/octicons-react";
import Head from "next/head";

export default function Index() {
  return (
    <Page>
      <Head>
        <title>
          ACEPhysics.net - Interactive Online Activities for Physics Learners
        </title>
      </Head>

      <Header>
        <UserMenu />
      </Header>

      <Content as="main" vertical={300}>
        <Prose>
          <h1>Interactive Online Activities for Physics Learners</h1>

          <p>
            Welcome to ACEPhysics:{" "}
            <em>Adaptable Curricular Exercises for Physics.</em>
          </p>
        </Prose>

        <Horizontal justify="center">
          <Button color="green" link={urls.Tutorials.link}>
            Take me to the online tutorials <ArrowRightIcon />
          </Button>
        </Horizontal>

        <Prose>
          Today, ACEPhysics.net is home to a handful of interactive activities—
          <em>tutorials</em>—for physics students studying quantum mechanics.
          Perhaps one day this website will hold an extensive suite of such
          activities for all physics learners.
        </Prose>
      </Content>
    </Page>
  );
}
