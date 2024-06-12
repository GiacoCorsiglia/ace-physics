import { UserMenu } from "@/auth/client";
import { Breadcrumb, Header, MainContentBox, Page, Prose } from "@/components";
import { TutorialList } from "@/tutorial/components/tutorial-list";
import { tutorialList } from "./tutorials/list";

export default function QisPage() {
  return (
    <Page title="Tutorials about Quantum Information Science">
      <Header title="QIS Tutorials" popovers={<UserMenu />} />

      <MainContentBox>
        <Breadcrumb items={[Breadcrumb.home]} />

        <Prose>
          <h1>
            <em>Tutorials</em> about Quantum Information Science
          </h1>

          <p>
            A set of interactive instructional activities designed to complement
            an introductory quantum computing or quantum information course.
          </p>
        </Prose>

        <nav>
          <TutorialList tutorials={tutorialList} tags={["QIS"]} />
        </nav>
      </MainContentBox>
    </Page>
  );
}
