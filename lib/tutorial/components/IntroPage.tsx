import { htmlTitle } from "@/helpers";
import Head from "next/head";
import React from "react";
import { IntroConfig, TutorialConfig } from "../config";

export default function IntroPage({
  config,
  tutorialConfig,
}: {
  config: IntroConfig;
  tutorialConfig: TutorialConfig;
}) {
  return (
    <>
      <Head>
        <title>
          {htmlTitle(
            typeof tutorialConfig.label === "string"
              ? tutorialConfig.label
              : tutorialConfig.label.title
          )}
        </title>
      </Head>

      <h1>
        {typeof tutorialConfig.label === "string"
          ? tutorialConfig.label
          : tutorialConfig.label.html}
      </h1>

      {config.body}
    </>
  );
}
