import { Answer, ChooseOne, M, Prose, TextBox, Toggle } from "@/components";
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
          <ChooseOne
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
            <p>
              {" "}
              By measuring after the gates she applied, all information about
              the mystery is irrecoverably lost to Alice. We noted earlier that
              she has equal (25%) chance of measuring 00, 01, 10, or 11, no
              matter what the mystery state was. So her measurements yielded no
              useful information at all to her about a or b.{" "}
            </p>
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

          <Answer>
            There was one (mystery) quantum state <M t="\ket{\phi}\ " /> to
            start, and the same state is present in the end. We have not cloned
            (duplicated) this quantum state, we have merely transported it from
            one location to another. Interestingly, the transportation was not
            done by sending any physical object (except the initial sharing of
            the entangled
            <M t="\ket{\beta_{00}}\ " />
            pair, and the later sharing of 2 classical bits of information).
          </Answer>
        </>
      ),
    }),

    section({
      name: "parting3ftl",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.parting3ftl}
            label={
              <Prose>
                Quantum state collapse in quantum mechanics is “instantaneous”.
                Does this mean teleportation can send the mystery qubit faster
                than the speed of light?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
            answer="no"
          />

          {responses?.parting3ftl && (
            <TextBox
              model={m.parting3ftlExplain}
              label={
                responses.parting3ftl.selected === "yes" ? (
                  <Prose>
                    Explain your reasoning. (Does quantum teleportation violate
                    special relativity in any way?)
                  </Prose>
                ) : (
                  <Prose>Explain your reasoning, why not?</Prose>
                )
              }
            />
          )}

          <Answer>
            A classical signal has to be sent to inform Bob which gate(s) to
            operate. No protocol could work any faster than those classical
            signals can travel (limited by the speed of light.) There is no
            violation of special relativity of any kind, no breaking of
            causality.
          </Answer>
        </>
      ),
    }),

    // section({
    //   name: "parting4discuss",
    //   body: (m) => (
    //     <>
    //       <Prose>
    //         {" "}
    //         <p>
    //           And, here are two final questions to reflect on, which perhaps get
    //           at the essential elements of any teleportation protocol.
    //         </p>
    //       </Prose>
    //       <TextBox
    //         model={m.parting4final1}
    //         label={
    //           <Prose>
    //             Why did we need to share an entangled pair in the first place?
    //           </Prose>
    //         }
    //       />
    //       {/* <TextBox
    //         model={m.parting4final2}
    //         label={
    //           <Prose>
    //             Why did Alice need to send any classical communication to Bob at
    //             all? (After all, her measure- ment collapsed Bob’s state. Why
    //             wasn’t that enough, without sending two classical bits?)
    //           </Prose>
    //         }
    //       /> */}
    //       {/* <Answer>
    //          <p> (We leave you to think about these questions on your own!)</p>
    //        </Answer> */}
    //     </>
    //   ),
    // }),

    // Wrap up the page
    //
    //
    //
    section({
      name: "parting4discuss",
      body: (m) => (
        <>
          <Prose>
            And, here are two final questions for you to continue to reflect on,
            which perhaps get at the essential elements of any teleportation
            protocol: <br /> 1. Why did we need to share an entangled pair in
            the first place?
            <br /> 2. Why did Alice need to send any classical communication to
            Bob at all? <br /> (After all, her measurement collapsed Bob’s
            state. Why wasn’t that enough, without sending two classical bits?)
          </Prose>
        </>
      ),
    }),
  ],
}));
