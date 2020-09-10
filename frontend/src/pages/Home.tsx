import { ArrowRightIcon } from "@primer/octicons-react";
import React from "react";
import { Prose } from "src/components";
import { Button } from "src/components/inputs";
import { Content, Header, Page } from "src/components/layout";
import { UserMenu } from "src/components/shared/UserMenu";
import * as urls from "src/urls";

export default function Home() {
  return (
    <Page title="">
      <Header>
        <UserMenu />
      </Header>

      <Content as="main">
        <Prose>
          <h1>Welcome to ACEPhysics.net</h1>

          <p>Adaptive Curricular Exercises for Physics—online!</p>

          <p>
            Today, ACEPhysics.net is home to a handful of interactive
            activities—<em>tutorials</em>—for physics students studying quantum
            mechanics. Perhaps one day this website will hold an extensive suite
            of such activities for all physics learners.
          </p>
        </Prose>

        <Button className="margin-top" link={urls.Tutorials.link}>
          Take me to the online tutorials <ArrowRightIcon />
        </Button>
      </Content>
    </Page>
  );
}
