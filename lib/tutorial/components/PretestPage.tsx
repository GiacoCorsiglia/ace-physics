import { htmlTitle } from "@/helpers";
import Head from "next/head";
import { PretestConfig, TutorialConfig } from "../config";
import PretestSection from "./PretestSection";

export default function PretestPage({
  config,
  tutorialConfig,
}: {
  config: PretestConfig;
  tutorialConfig: TutorialConfig;
}) {
  return (
    <>
      <Head>
        <title>{htmlTitle("Before You Start")}</title>
      </Head>

      {/* This config should be stable so we can use the index as the key. */}
      {config.sections.map((section, i) => (
        <PretestSection key={i} config={section} />
      ))}
    </>
  );
}
