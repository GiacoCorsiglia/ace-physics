import { UserMenu } from "@/auth/client";
import { Breadcrumb, Header, MainContentBox, Page, Prose } from "@/components";
import { TutorialList } from "@/tutorial/components/tutorial-list";
import { tutorialList } from "./list";

export default function TutorialsIndex() {
  return (
    <Page
      title="Tutorials"
      metaDescription="All the tutorials available on ACE Physics.  ACE Physics provides a set of interactive tutorial activities for teaching quantum mechanics and quantum information."
    >
      <Header title="All Tutorials" popovers={<UserMenu />} />

      <MainContentBox>
        <Breadcrumb items={[Breadcrumb.home]} />

        <Prose>
          <h1>
            <em>Tutorials</em> about Quantum Mechanics
          </h1>

          <p>
            Here’s a set of interactive activities for people studying quantum
            mechanics. If your professor sent you here, they can probably tell
            you which tutorial is most relevant for your class—but you’re always
            welcome to explore!
          </p>
        </Prose>

        <nav>
          <TutorialList tutorials={tutorialList} />
        </nav>
      </MainContentBox>
    </Page>
  );
}
