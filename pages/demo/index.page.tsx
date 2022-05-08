import {
  Breadcrumb,
  Button,
  Callout,
  Horizontal,
  LinkCard,
  MainContentBox,
  Page,
  Prose,
  Vertical,
} from "@/components";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MailIcon,
} from "@primer/octicons-react";
import { signIn } from "next-auth/react";
import Head from "next/head";

export default function Index() {
  return (
    <Page>
      <Head>
        <title>
          ACEPhysics.net Demo - Interactive Online Activities for Physics
          Learners
        </title>
      </Head>

      <MainContentBox marginTop="small">
        <Breadcrumb
          items={[
            {
              link: "/",
              label: (
                <>
                  <ArrowLeftIcon /> Home
                </>
              ),
            },
          ]}
        />

        <Prose>
          <h1>
            <abbr title="Adaptable Curricular Exercises for Physics">ACE</abbr>{" "}
            Physics
          </h1>

          <p>
            We’re developing a suite of online activities—<em>tutorials</em>—for
            middle/upper-division quantum mechanics. They’re{" "}
            <strong>freely available</strong> for anyone to use and explore.
            Please note this is <strong>beta software</strong>—we need your help
            to improve it!
          </p>
        </Prose>

        <Vertical.Space after={200}>
          <ol>
            <li>
              <LinkCard
                label={
                  <>
                    Changing Basis — <i>click here to try it out</i>
                  </>
                }
                link="/demo/quantum-basis"
              >
                <p>
                  Relate quantum state vectors to 2D Cartesian vectors, and
                  practice using projection inner products to change basis.
                </p>

                <p>
                  <em>
                    Note: the guidance on this page is more heavy-handed. The
                    answers to these questions help with the rest of the
                    tutorial.
                  </em>
                </p>
              </LinkCard>
            </li>

            <li>
              <LinkCard
                label={
                  <>
                    Quantum Mouse — <i>click here to try it out</i>
                  </>
                }
                link="/demo/quantum-mouse"
              >
                <p>
                  Practice with Dirac notation, interpretation and solving of
                  eigen-equations, and the basic quantum rules involving
                  probability amplitudes.
                </p>

                <p>
                  <em>
                    Note: the guidance on this page is less heavy-handed.
                    Students will grapple with similar questions as the tutorial
                    progresses.
                  </em>
                </p>
              </LinkCard>
            </li>
          </ol>
        </Vertical.Space>

        <Vertical.Space before={200} after={200}>
          <Callout color="green">
            <Vertical>
              <Prose justify="center">
                <strong>
                  Contact us to use ACE Physics in your classroom.
                </strong>
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

              <Prose size="small" justify="center">
                This isn’t required, but we can enable <em>instructor mode</em>{" "}
                for your account, which allows you to manage your courses and
                access student work.
              </Prose>
            </Vertical>
          </Callout>
        </Vertical.Space>

        <Prose>
          Whether you’re considering using ACE Physics, or if you’re just
          exploring, <strong>we’re interested in your feedback.</strong> Please
          do get in touch if you might like to use these activities in your
          classes.
        </Prose>

        <Vertical.Space before={200} after={200}>
          <Callout color="blue">
            <Vertical>
              <Prose justify="center">
                <strong>
                  Want to explore the full versions of all our tutorials?
                </strong>
              </Prose>

              <Horizontal justify="center">
                <Button
                  color="blue"
                  onClick={() =>
                    signIn(undefined, {
                      callbackUrl: "/tutorials",
                    })
                  }
                  iconRight={<ArrowRightIcon />}
                >
                  Sign in
                </Button>
              </Horizontal>

              <Prose size="small" justify="center">
                You can sign in with your email address.
              </Prose>
            </Vertical>
          </Callout>
        </Vertical.Space>
      </MainContentBox>
    </Page>
  );
}
