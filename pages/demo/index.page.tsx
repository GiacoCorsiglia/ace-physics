import { Button, Content, Horizontal, Page, Prose } from "@/components";
import { TutorialLink } from "@pages/tutorials/index.page";
import { MailIcon } from "@primer/octicons-react";
import Head from "next/head";
import Link from "next/link";

export default function Index() {
  return (
    <Page>
      <Head>
        <title>
          ACEPhysics.net Demo - Interactive Online Activities for Physics
          Learners
        </title>
      </Head>

      <Content as="main" marginTop="small">
        <Prose>
          <h1>Adaptive Curricular Exercises for Physics</h1>

          <p>Welcome to ACE Physics! Thanks for visiting.</p>

          <p>
            We’re developing a suite of online activities—<em>tutorials</em>—for
            middle/upper-division quantum mechanics. They’re{" "}
            <strong>freely available</strong> for anyone to use and explore.
            Please note this is <strong>beta software</strong>—we need your help
            to improve it!
          </p>

          <p>We have two tutorial pages for you to try out:</p>
        </Prose>

        <ol>
          <TutorialLink
            label={
              <>
                Changing Basis — <i>click here to try it out</i>
              </>
            }
            url={{ path: "quantum-basis", link: "/demo/quantum-basis" }}
          >
            <p>
              Relate quantum state vectors to 2D Cartesian vectors, and practice
              using projection inner products to change basis.
            </p>

            <p>
              <em>
                Note: the guidance on this page is more heavy-handed. The
                answers to these questions help with the rest of the tutorial.
              </em>
            </p>
          </TutorialLink>

          <TutorialLink
            label={
              <>
                Quantum Mouse — <i>click here to try it out</i>
              </>
            }
            url={{ path: "quantum-mouse", link: "/demo/quantum-mouse" }}
          >
            <p>
              Practice with Dirac notation, interpretation and solving of
              eigen-equations, and the basic quantum rules involving probability
              amplitudes.
            </p>

            <p>
              <em>
                Note: the guidance on this page is less heavy-handed. Students
                will grapple with similar questions as the tutorial progresses.
              </em>
            </p>
          </TutorialLink>
        </ol>

        <Prose>
          <p>
            If you want to explore the full versions of all of our tutorials,
            you can{" "}
            <Link href="/create-account">create an anonymous account</Link>.
          </p>

          <p>
            Whether you’re considering using ACE Physics in your classroom, or
            if you’re just exploring,{" "}
            <strong>we’re interested in your feedback.</strong> Please do get in
            touch if you might like to use these activities in your classes.
          </p>
        </Prose>

        <Horizontal justify="center">
          <Button
            color="green"
            link="mailto:hello@acephysics.net"
            iconLeft={<MailIcon />}
          >
            Email us
          </Button>
        </Horizontal>

        <Prose align="center">
          You can contact Giaco at{" "}
          <a href="mailto:hello@acephysics.net">hello@acephysics.net</a>.
        </Prose>
      </Content>
    </Page>
  );
}
