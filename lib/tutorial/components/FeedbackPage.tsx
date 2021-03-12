import { Button, TextBox, Toggle } from "@/components";
import { Prose } from "@/design";
import { Content } from "@/design/layout";
import styles from "@/design/structure.module.scss";
import { cx, htmlTitle } from "@/helpers/frontend";
import * as urls from "@/urls";
import { ArrowRightIcon } from "@primer/octicons-react";
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
            <p>
              <em>We need your help to make these tutorials better!</em>
            </p>

            <p>
              This feedback is anonymized. Feel free to be (respectfully)
              critical.
            </p>
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

        {/* <section className={styles.section}>
          <Prose>
            Today’s tutorial occasionally “checked your answers” and either told
            you that things looked good, or asked you to think some more or
            answer follow-up questions.
          </Prose>

          <TextArea
            model={m.answerCheckingChangeApproach}
            label={
              <Prose>
                Did the (occasional) “answer checking” change the way you
                approached the tutorial? (Did you rely on it?) Please explain.
              </Prose>
            }
          />
        </section> */}

        {/* <section className={styles.section}>
          <TextArea
            model={m.answerCheckingPreferenceOpenEnded}
            label={
              <Prose>
                <p>
                  Assume that our goal is to help you figure out,{" "}
                  <strong>for yourself</strong>, why “right” answers are “right”
                  and “wrong” answers are “wrong.”
                </p>

                <p>
                  How would you prefer that happen? How can this tutorial
                  software help?
                </p>
              </Prose>
            }
          />

          <Prose className="opacity-faded">
            <p>
              We take your feedback to heart. But, we can’t get to everything,
              and may have other reasons for not directly implementing your
              suggestions.
            </p>

            <p>
              We’re <strong>always</strong> happy to talk with you about these
              tutorials or about general questions or issues you may be having.
              Reach out any time!
            </p>
          </Prose>
        </section> */}

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

          <TextBox
            model={m.easyOrChallengingExplain}
            label={<Prose>Optional: What makes you feel that way?</Prose>}
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

          <TextBox
            model={m.confidenceExplain}
            label={<Prose>Optional: What makes you feel that way?</Prose>}
          />
        </section>

        <section className={styles.section}>
          <TextBox
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
            color="green"
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
