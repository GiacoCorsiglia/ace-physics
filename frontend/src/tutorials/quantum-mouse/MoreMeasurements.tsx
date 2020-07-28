import React from "react";
import { Prose, Reminder, Section } from "src/components";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { Part } from "src/tutorials/shared";

export default function MoreMeasurement() {
  return (
    <Part label="More Measurements">
      <Content>
        <Section first>
          <Reminder>
            <Prose>
              <p>
                Small-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\cdot} = 1 \ket{\cdot}" /> <br />
                Wide-eyed mice: &nbsp; <M t="\hat{S}\ket{*} = 2 \ket{*}" />{" "}
                <br />
                Happy mice: &nbsp; <M t="\hat{M}\ket{😸}=\ket{😸}" /> <br />
                Sad mice: &nbsp; <M t="\hat{M}\ket{😿}= -\ket{😿}" />
              </p>
            </Prose>
          </Reminder>
          <Prose>
            <p>
              Suppose I gave you a quantum mouse. You measure <M t="\hat{M}" />{" "}
              and find the eigenvalue <M t="-1" />.
            </p>
            <p>What state describes the mouse after this measurement?</p>
          </Prose>
          //Multiple choice
          <Prose>Is there any ambiguity about the state at this point?</Prose>
          //text box and hint that discusses what we mean by ambiguity
        </Section>

        <Section>
          <Prose>
            {" "}
            What is the probability that a subsequent measurement of{" "}
            <M t="\hat{S}" /> will yield a result of <M t="1" />
            mm, i.e., "small-eyed"? (
            <em>Work it out from the postulates of quantum mechanics!</em>)
          </Prose>
          //MC? Possibly add an explain. Hint would suggest that the postulates
          give a formula for probability and possible suggest drawing out the SG
          system
        </Section>

        <Section>
          <Prose>
            {" "}
            <p>
              Consider again the measurement and outcome “chain” given in the
              parts above:
            </p>
            <p>
              You first measured <M t="\hat{M}" />, and you happened to get{" "}
              <M t="-1" /> (This was an unhappy mouse).
            </p>
            <p>
              Then you measured <M t=" \hat{S}" /> and you happened to get{" "}
              <M t="1" /> mm.
            </p>
            <p>
              Now, you measure mood once again. What do you get (with what
              probabilities?
            </p>
          </Prose>
          //I feel like I want this one to be openended/textbox. Or we need to
          make the optons: only one value vs multiple values
        </Section>

        <Section>
          <Prose>
            <p>
              Think a bit about this chain of events – is there anything at all
              curious or surprising about it (from a classical perspective?)
            </p>
          </Prose>
          //textbox
        </Section>

        <Section>
          <Prose>
            <p>Thinking deeper:</p>
            <p>
              If I give you a quantum mouse whose eye-size has been measured. Is
              it fair to say: “That mouse is either happy or sad. It is
              definitely one or the other, I just don’t know which, yet.”{" "}
            </p>
          </Prose>
          //textbox. But I think this question should include some detailed
          thought from our end and may include a sentence or so from an expert
          perspective
        </Section>
      </Content>
    </Part>
  );
}
