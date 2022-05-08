import { useAuth, UserMenu } from "@/auth/client";
import {
  Button,
  Header,
  Justify,
  MainContentBox,
  Page,
  Prose,
} from "@/components";
import { ArrowRightIcon } from "@primer/octicons-react";
import Head from "next/head";

export default function Index() {
  const auth = useAuth();

  const link = auth.status === "authenticated" ? "/courses" : "/tutorials";

  return (
    <Page>
      <Head>
        <title>
          ACEPhysics.net - Interactive Online Activities for Physics Learners
        </title>
      </Head>

      <Header title="ACE Physics" popovers={<UserMenu />} />

      <MainContentBox vertical={200}>
        <Prose>
          <h1>Interactive Online Activities for Physics Learners</h1>

          <p>
            Welcome to ACE Physics:{" "}
            <em>Adaptable Curricular Exercises for Physics.</em>
          </p>
        </Prose>

        <Justify center>
          <Button color="green" link={link} iconRight={<ArrowRightIcon />}>
            Get started
          </Button>
        </Justify>

        <Prose>
          <p>
            ACE Physics is home to interactive activities—
            <em>tutorials</em>—for physics students studying quantum mechanics.
          </p>

          <p>
            <strong>Considering using ACE Physics in your classroom?</strong>{" "}
            Check out the instructor demo below—no sign in required.
          </p>
        </Prose>

        <Justify center>
          <Button color="blue" link="/demo" iconRight={<ArrowRightIcon />}>
            Instructor demo
          </Button>
        </Justify>

        <Prose>
          <p>
            <a href="mailto:hello@acephysics.net">Contact us</a> to use ACE
            Physics in your classroom. We can enable <em>instructor mode</em>{" "}
            for your account, which allows you to manage your courses and access
            your students’ work.
          </p>

          <p>
            ACE Physics is <strong>free</strong> for all to use. We hope you
            find it useful!
          </p>
        </Prose>
      </MainContentBox>
    </Page>
  );
}
