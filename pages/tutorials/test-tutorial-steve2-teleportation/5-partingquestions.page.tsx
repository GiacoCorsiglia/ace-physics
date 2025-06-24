import { Answer, Prose, TextBox, Toggle } from "@/components";
import { page } from "@/tutorial";

import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "partingquestions",
  label: "Some parting questions",
  answers: "provided",

  sections: [
    section({
      name: "partingquestionsIntro",
      body: (
        <Prose>
          Teleportation is a quantum protocol that transports a quantum state
          from one location to another, perhaps far away. It requires an
          initially prepared entangled state, which must be shared beforehand,
          and two bits of classical communication.
        </Prose>
      ),
      continue: {
        label: "Let's wrap this up with some parting questions!",
      },
    }),

    section({
      name: "parting1usefulinfo",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.parting1usefulinfo}
            label={
              <Prose>
                After the protocol is complete, does Alice have any useful
                information about the mystery state?
              </Prose>
            }
            choices={[
              ["lots", "Yes, lots of information"],
              ["some", "Yes, some information"],
              ["no", "No useful information"],
            ]}
            answer="no"
          />

          {responses?.parting1usefulinfo && (
            <TextBox
              model={m.parting1usefulinfoExplain}
              label={
                responses.parting1usefulinfo.selected === "lots" ? (
                  <Prose>
                    Explain your thinking -- what information does she have?
                  </Prose>
                ) : responses.parting1usefulinfo.selected === "some" ? (
                  <Prose>
                    Explain your thinking -- what information does she have?
                  </Prose>
                ) : (
                  <Prose>
                    Explain your thinking -- why doesn't she have any useful
                    information ?
                  </Prose>
                )
              }
            />
          )}

          <Answer>
            <p> ZZZ Our Answer goes here </p>
          </Answer>
        </>
      ),
    }),

    section({
      name: "parting2cloned",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.parting2cloned}
            label={
              <Prose>
                Have we copied (“cloned”) a quantum bit with this protocol?
                <br /> Note: cloning means there are two copies.
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
            answer="no"
          />

          {responses?.parting2cloned && (
            <TextBox
              model={m.parting2clonedExplain}
              label={
                responses.parting2cloned.selected === "yes" ? (
                  <Prose>
                    Explain your reasoning, where are the two copies? (Who
                    possesses them?)
                  </Prose>
                ) : (
                  <Prose>Explain your reasoning, why not?</Prose>
                )
              }
            />
          )}

          <Answer>ZZ our answer here</Answer>
        </>
      ),
    }),

    // Wrap up the page
    //
    //
    //
  ],
}));
