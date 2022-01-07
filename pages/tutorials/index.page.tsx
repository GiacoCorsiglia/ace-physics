import { UserMenu } from "@/auth/client";
import { Header, MainContentBox, Page, Prose } from "@/components";
import { TutorialList } from "@/tutorial/components/tutorial-list";
import { tutorialList } from "./list";

export default function TutorialsIndex() {
  return (
    <Page title="Tutorials">
      <Header title="All Tutorials" popovers={<UserMenu />} />

      <MainContentBox>
        <Prose>
          <h1>
            <em>Tutorials</em> about Quantum Mechanics
          </h1>

          <p>
            Here’s a set of interactive activities for people studying quantum
            mechanics. If you’re here on this website, good chance you’re one of
            those people! We hope you find them useful—and we’ll be interested
            to know what you think.
          </p>

          <p>
            If your professor sent you here, they can probably tell you which
            tutorial is most relevant to whatever you’re covering in class this
            week. You should probably check in with them (or maybe refer to your
            course’s webpage). Of course, you’re always welcome to explore!
          </p>
        </Prose>

        <nav>
          <TutorialList tutorials={tutorialList} />
        </nav>
      </MainContentBox>
    </Page>
  );
}
