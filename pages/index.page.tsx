import * as urls from "@/urls";
import { ArrowRightIcon } from "@primer/octicons-react";
import { Prose } from "components";
import { Button } from "components/inputs";
import { Content, Header, Page } from "components/layout";
import { UserMenu } from "components/shared/UserMenu";

export default function Index() {
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
