import { Prose } from "@/design";
import { Content } from "@/design/layout";
import styles from "@/design/structure.module.scss";
import { htmlTitle } from "@/helpers";
import { Button, TextArea, Toggle } from "@/inputs";
import * as urls from "@/urls";
import { ArrowRightIcon } from "@primer/octicons-react";
import { cx } from "linaria";
import Head from "next/head";
import React from "react";
import { TutorialConfig } from "../config";
import { useRootModel } from "../state-tree";

export default function FeedbackPage({
  tutorialConfig,
}: {
  tutorialConfig: TutorialConfig;
}) {
  const rootModel = useRootModel();
  const m = rootModel.properties.feedback.properties;

  return (
    <>
      <Head>
        <title>{htmlTitle("Feedback")}</title>
      </Head>

      <Content>
        <section>
          <h1 className="prose">Please Share Your Feedback</h1>

          <Prose>
            <em>We need your help to make these tutorials better!</em>
          </Prose>
        </section>

        <section className={styles.section}>
          <Toggle
            model={m.workedAlone}
            label={<Prose>I worked on this tutorial…</Prose>}
            choices={[
              ["in class", "In class"],
              ["alone", "Outside of class, alone"],
              ["partner", "Outside of class, with friends"],
            ]}
          />
        </section>

        <section className={styles.section}>
          <Toggle
            model={m.confidence}
            choices={[
              ["much less", "Much less confident"],
              ["less", "Less"],
              ["same", "The same"],
              ["more", "More"],
              ["much more", "Much more confident"],
            ]}
            label={
              <Prose>
                Compared to before you started the tutorial, how confident do
                you feel about your understanding of the topics you think it
                covered?
              </Prose>
            }
          />

          <TextArea
            model={m.confidenceExplain}
            label={<Prose>Optional: What makes you feel that way?</Prose>}
          />
        </section>

        <section className={styles.section}>
          <Toggle
            model={m.easyOrChallenging}
            choices={[
              ["easy/useful", "Easy but useful"],
              ["easy/frustrating", "Easy but frustrating"],
              ["challenging/useful", "Challenging but useful"],
              ["challenging/frustrating", "Challenging and frustrating"],
            ]}
            layout="grid"
            label={<Prose>I thought that this tutorial was mostly…</Prose>}
          />

          <TextArea
            model={m.easyOrChallengingExplain}
            label={<Prose>Optional: What makes you feel that way?</Prose>}
          />
        </section>

        <section className={styles.section}>
          <TextArea
            model={m.technicalDifficulties}
            label={
              <Prose>
                Did you have any difficulty with the interface or any other
                technical difficulties? Please help us improve!
              </Prose>
            }
          />
        </section>

        <section className={cx(styles.section, "text-right")}>
          <Button
            link={urls.join(
              urls.Tutorials.link,
              tutorialConfig.link,
              "finished"
            )}
          >
            I’m done <ArrowRightIcon />
          </Button>
        </section>
      </Content>
    </>
  );
}

const materialsChoices = [
  ["no", "Not at all"],
  ["a bit", "A bit"],
  ["repeatedly", "Repeatedly"],
] as const;
