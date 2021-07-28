import { UserMenu } from "@/auth";
import { Prose } from "@/design";
import { Content, Header, Page } from "@/design/layout";
import Head from "next/head";
import React from "react";

export default function Index() {
  return (
    <Page>
      <Head>
        <title>
          ACEPhysics.net Demo - Interactive Online Activities for Physics
          Learners
        </title>
      </Head>

      <Header>
        <UserMenu />
      </Header>

      <Content as="main">
        <Prose>
          <h1>Welcome to ACEPhysics.net</h1>

          <p>Adaptive Curricular Exercises for Physics—online!</p>

          <p>Demo page coming soon for AAPT!</p>

          <p>
            Meanwhile, you can contact us at{" "}
            <a href="mailto:hello@acephysics.net">hello@acephysics.net</a>.
          </p>
        </Prose>
      </Content>
    </Page>
  );
}
