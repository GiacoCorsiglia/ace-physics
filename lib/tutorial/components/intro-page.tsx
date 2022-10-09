import {
  Button,
  Justify,
  PageTitle,
  Prose,
  SectionBox,
  Vertical,
} from "@/components";
import { htmlTitle } from "@/helpers/client";
import * as urls from "@/urls";
import { ArrowRightIcon } from "@primer/octicons-react";
import Head from "next/head";
import { IntroConfig, TutorialConfig } from "../config";

export const IntroPage = ({
  config,
  tutorialConfig,
}: {
  config: IntroConfig;
  tutorialConfig: TutorialConfig;
}) => {
  return (
    <SectionBox>
      <Head>
        <title>
          {htmlTitle(
            typeof tutorialConfig.label === "string"
              ? tutorialConfig.label
              : tutorialConfig.label.title
          )}
        </title>
      </Head>

      <PageTitle>
        {typeof tutorialConfig.label === "string"
          ? tutorialConfig.label
          : tutorialConfig.label.html}
      </PageTitle>

      {config.body}

      <hr />

      <Prose boldColor="blue">
        <p>
          <strong>
            This activity is not about “right” or “wrong” answers,
          </strong>{" "}
          it’s about helping you to think about challenging ideas.
        </p>

        <p>And it won’t be graded (except maybe for participation credit).</p>

        <p>
          <strong>
            Take your time. If you get stuck, try the hints, and then give it
            your best guess.
          </strong>{" "}
          There might be some follow-up questions that clear things up for you.
          Go back and change your answers if you want. Or—feel confident, and
          don’t!
        </p>

        <p>
          <strong>
            Learning doesn’t stop once you’ve submitted your answers.
          </strong>{" "}
          We hope this activity helps you learn something today. If it does,
          it’ll be thanks to you, not us.
        </p>

        <p>
          Oh—<strong>have some scrap paper ready</strong> and draw and work
          things out for yourself.
        </p>

        <p>Good luck!</p>

        <p>
          <em>- Giaco, Ben, Steve, Gina, and Homeyra</em>
        </p>

        <p>
          <em>P.S. Your work will be saved automatically.</em>
        </p>
      </Prose>

      <hr />

      <Vertical.Space before={300}>
        <Justify end>
          <Button
            color="green"
            link={urls.join(
              `/${urls.Tutorials.path}`,
              tutorialConfig.link,
              tutorialConfig.pretest
                ? "before-you-start"
                : tutorialConfig.pages[0].link
            )}
            iconRight={<ArrowRightIcon />}
          >
            Let’s get going
          </Button>
        </Justify>
      </Vertical.Space>
    </SectionBox>
  );
};
